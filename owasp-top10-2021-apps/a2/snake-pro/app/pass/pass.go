package pass

import "golang.org/x/crypto/bcrypt"

// CheckPass checks a password
func CheckPass(truePassword, attemptPassword string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(truePassword), []byte(attemptPassword))
	return err == nil
}
