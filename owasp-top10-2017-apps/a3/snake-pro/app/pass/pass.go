package pass

import "golang.org/x/crypto/bcrypt"

func CheckPass(truePassword, attemptPassword string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(truePassword), []byte(attemptPassword))
	return err == nil
}
