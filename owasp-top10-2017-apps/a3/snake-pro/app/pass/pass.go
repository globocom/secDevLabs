package pass

import "golang.org/x/crypto/bcrypt"

// HashPassword uses bcrypt algorithm for hashing
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 20)
	return string(bytes), err
}

// CheckPasswordHash uses bcrypt algorithm for hashing and checking against already hashed password
func CheckPass(hash, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
