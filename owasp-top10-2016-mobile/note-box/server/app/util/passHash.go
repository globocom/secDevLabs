package util

import (
	"crypto/rand"
	"crypto/sha256"

	"golang.org/x/crypto/pbkdf2"
)

func generateRandomBytes(n int) ([]byte, error) {
	b := make([]byte, n)
	_, err := rand.Read(b)
	// Note that err == nil only if we read len(b) bytes.
	if err != nil {
		return nil, err
	}

	return b, nil
}

func generateSalt(byteNumber int) ([]byte, error) {
	salt, err := generateRandomBytes(byteNumber)
	if err != nil {
		return nil, err
	}

	return salt, nil
}

// Hash returns the hashed password and the salt used.
func Hash(password string) (string, string, error) {
	salt, err := generateSalt(32)
	if err != nil {
		return "", "", err
	}

	hashedPassword := pbkdf2.Key([]byte(password), salt, 4096, 32, sha256.New)

	return string(hashedPassword), string(salt), nil
}

// VerifyHash returns true if the received password matches the hash with the given salt.
func VerifyHash(password string, hashedPassword string, salt string) bool {
	newHash := pbkdf2.Key([]byte(password), []byte(salt), 4096, 32, sha256.New)

	if string(newHash) == string(hashedPassword) {
		return true
	}

	return false
}
