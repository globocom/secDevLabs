package pass

import (
	"golang.org/x/crypto/bcrypt"
)

func CheckPass(hash, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
