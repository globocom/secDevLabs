package pass

import "golang.org/x/crypto/bcrypt"

// CheckPass checks a password
func CheckPass(hashedPassword, plainPassword string) bool {
	attemptByte := []byte(plainPassword)
	passwordByte := []byte(hashedPassword)

	err := bcrypt.CompareHashAndPassword(passwordByte, attemptByte)
	if err != nil {
		return false
	}
	return true
}

// HashPass uses bcryt for hashing
func HashPass(pwd string) (string, error) {
	password := []byte(pwd)
	hashedPassword, err := bcrypt.GenerateFromPassword(password, bcrypt.DefaultCost)

	if err != nil {
		return "", err
	}
	return string(hashedPassword), nil
}
