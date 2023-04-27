package services

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt"
)

type JwtCustomClaims struct {
	Name     string `json:"name"`
	Recovery bool   `json:"admin"`
	jwt.StandardClaims
}

func GenerateJwt(login string, recovery bool) (string, error) {

	secret := os.Getenv("JWT_SECRET")

	claims := &JwtCustomClaims{
		login,
		recovery,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 72).Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	t, err := token.SignedString([]byte(secret))
	if err != nil {
		return "", err
	}

	return t, nil
}
