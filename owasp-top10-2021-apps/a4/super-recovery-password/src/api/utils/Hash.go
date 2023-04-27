package utils

import (
	"fmt"

	"github.com/labstack/gommon/log"
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) ([]byte, error) {
	pass := []byte(password)

	hashedPassword, err := bcrypt.GenerateFromPassword(pass, bcrypt.DefaultCost)
	if err != nil {
		msg := fmt.Sprintf("Error: %s", err)
		log.Error(msg)
		return nil, err
	}

	return hashedPassword, nil
}

func ComparePassword(password string, hashedPass []byte) error {
	pass := []byte(password)

	err := bcrypt.CompareHashAndPassword(hashedPass, pass)
	if err != nil {
		msg := fmt.Sprintf("Error: %s", err)
		log.Error(msg)
		return err
	}

	return nil
}
