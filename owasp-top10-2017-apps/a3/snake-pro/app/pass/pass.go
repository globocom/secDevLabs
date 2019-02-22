package pass

import (
	"golang.org/x/crypto/bcrypt"
)

// CheckPass checks a password
func CheckPass(truePassword, attemptPassword string) bool {
	return truePassword == attemptPassword
}

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
