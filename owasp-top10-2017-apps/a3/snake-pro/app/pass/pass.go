package pass

import "golang.org/x/crypto/bcrypt"

// CheckPass checks a password
func CheckPass(attemptPassword, truePassword string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(truePassword), []byte(attemptPassword))
	return err == nil
}

// Hash the password before send to the database
func HashPass(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}