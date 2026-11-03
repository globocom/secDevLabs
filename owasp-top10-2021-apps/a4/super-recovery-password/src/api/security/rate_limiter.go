
package security

import (
	"sync"
	"time"
)

type attemptWindow struct {
	count     int
	expiresAt time.Time
}

type RateLimiter struct {
	mu          sync.Mutex
	attempts    map[string]attemptWindow
	maxAttempts int
	window      time.Duration
}

func NewRateLimiter(maxAttempts int, window time.Duration) *RateLimiter {
	return &RateLimiter{
		attempts:    make(map[string]attemptWindow),
		maxAttempts: maxAttempts,
		window:      window,
	}
}

func (l *RateLimiter) Allow(key string) bool {
	l.mu.Lock()
	defer l.mu.Unlock()

	now := time.Now()
	attempt, exists := l.attempts[key]

	if !exists {
		return true
	}

	if !now.Before(attempt.expiresAt) {
		delete(l.attempts, key)
		return true
	}

	return attempt.count < l.maxAttempts
}

func (l *RateLimiter) RecordFailure(key string) {
	l.mu.Lock()
	defer l.mu.Unlock()

	now := time.Now()
	attempt, exists := l.attempts[key]

	if !exists || !now.Before(attempt.expiresAt) {
		l.attempts[key] = attemptWindow{
			count:     1,
			expiresAt: now.Add(l.window),
		}
		return
	}

	attempt.count++
	l.attempts[key] = attempt
}

func (l *RateLimiter) Reset(key string) {
	l.mu.Lock()
	defer l.mu.Unlock()

	delete(l.attempts, key)
}
