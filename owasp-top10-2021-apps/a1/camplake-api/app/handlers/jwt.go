package handlers

import (
	"encoding/base64"
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"time"

	"camp-lake-api/types"

	"github.com/dgrijalva/jwt-go"
)

var jwtKey = []byte("my_secret_key")

func CreateToken(creds types.Credentials) (string, error) {
	expirationTime := time.Now().Add(5 * time.Minute)
	claims := &types.Claims{
		Username: creds.Username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		log.Fatal(err)
	}
	return tokenString, nil
}

func ExtractToken(r *http.Request) string {
	bearToken := r.Header.Get("Authorization")
	//normally Authorization the_token_xxx
	strArr := strings.Split(bearToken, " ")
	if len(strArr) == 2 {
		return strArr[1]
	}
	return ""
}

func TokenValid(r *http.Request) (types.Claims, error) {
	header := types.Header{}
	claims := types.Claims{}

	token := ExtractToken(r)
	if token == "" {
		log.Println("No token!")
		return claims, nil
	}
	t := strings.Split(token, ".")

	h, err := base64.StdEncoding.WithPadding(base64.NoPadding).DecodeString(t[0])
	if err != nil {
		return claims, err
	}

	err = json.Unmarshal(h, &header)
	if err != nil {
		log.Fatalln("Error in JSON unmarshalling from json marshalled object:", err)
		return claims, err
	}
	if header.Typ != "JWT" {
		log.Fatalln("Error on JWT")
	}

	c, err := base64.StdEncoding.WithPadding(base64.NoPadding).DecodeString(t[1])
	if err != nil {
		return claims, err
	}

	err = json.Unmarshal(c, &claims)
	if err != nil {
		log.Fatalln("Error in JSON unmarshalling from json marshalled object:", err)
		return claims, err
	}

	return claims, nil
}
