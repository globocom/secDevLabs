package pass

import "golang.org/x/crypto/bcrypt"

// CheckPass checks a password
func CheckPass(hashedPassword, attemptPassword string) bool {
	if err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(attemptPassword)); err != nil {
		return false
	}
	return true
}

// HashPassword hashes the password using bcrypt
func HashPassword(password string) (hashedPassword []byte, err error) {
	hashedPassword, err = bcrypt.GenerateFromPassword([]byte(password), 10)
	return
}
