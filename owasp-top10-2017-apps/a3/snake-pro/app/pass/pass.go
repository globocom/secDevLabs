package pass

import "golang.org/x/crypto/bcrypt"

const bcryptCost = 10

// CheckPass checks a password
func CheckPass(truePasswordHash, attemptPassword string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(truePasswordHash), []byte(attemptPassword))
	if err != nil {
		return false
	}
	return true
}

// HashPass hashes a password
func HashPass(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcryptCost)
	if err != nil {
		return "", err
	}
	return string(hash), nil
}
