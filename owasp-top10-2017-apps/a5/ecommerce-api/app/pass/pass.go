package pass

import "golang.org/x/crypto/bcrypt"

// BcrpytPassword returns a hashed password using bcrypt and an error.
func BcrpytPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

// CheckPasswordHash returns a bool if a password matches its brcrypt hash.
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
