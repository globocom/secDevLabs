package pass

import (
	"fmt"
	"crypto/sha256"
	"crypto/rand"
)

// CheckPass checks a password
func CheckPass(truePassword, attemptPassword, salt string) bool {
	return truePassword == HashPass(attemptPassword, salt)
}

func HashPass(password, salt string) string {
	hash := sha256.New()
	hash.Write([]byte(password))
	hash.Write([]byte(salt))
	return fmt.Sprintf("%x", hash.Sum(nil))
}

func GenerateRandomSalt() string {
	salt := make([]byte, 32)
	rand.Read(salt)
	return fmt.Sprintf("%x", salt)
}
