package pass

import "golang.org/x/crypto/bcrypt"

// HashPass hashes password with bcrypt (currently set to default cost)
func HashPass(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedPassword), nil
}

// CheckPass checks a password
func CheckPass(truePassword, attemptPassword string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(truePassword), []byte(attemptPassword))
	if err != nil {
		return false
	}
	return true
}
