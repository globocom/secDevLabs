package pass

import "golang.org/x/crypto/bcrypt"

// CheckPass checks a password
func CheckPass(truePassword, attemptPassword string) bool {
	hashedAttemptPassword, err := GeneratePasswordHash(attemptPassword)
	if err != nil {
		return false
	}
	return truePassword == string(hashedAttemptPassword)
}

// GeneratePasswordHash generates a hash for a given password
func GeneratePasswordHash(password string) (hash []byte, err error) {
	hash, err = bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return hash, err
}
