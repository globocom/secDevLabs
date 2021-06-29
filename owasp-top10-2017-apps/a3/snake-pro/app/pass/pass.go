package pass

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (string, error) {
	bs, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", fmt.Errorf("Error while generating bcrypt hash from password: %w", err)
	}
	return string(bs), nil
}

// CheckPass checks a password
func CheckPass(truePassword, attemptPassword string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(truePassword), []byte(attemptPassword))
	if err != nil {
		return false
	}
	return true
}
