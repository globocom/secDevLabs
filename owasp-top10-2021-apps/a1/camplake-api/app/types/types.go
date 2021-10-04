package types

import "github.com/dgrijalva/jwt-go"

type Header struct {
	Alg string `json:"alg"`
	Typ string `json:"typ"`
}

type Credentials struct {
	Password string `json:"password"`
	Username string `json:"username"`
}

type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

// LoginAttempt is the struct that stores all data from a login attempt.
type LoginAttempt struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// UserData is the struct that holds all data from user from MongoDB.
type UserData struct {
	Username       string `json:"username" bson:"username"`
	RawPassword    string `json:"password"`
	HashedPassword string `json:"hashedPassword" bson:"hashedPassword"`
	UserID         string `bson:"userID"`
}

type Post struct {
	UserName uint64 `json:"username"`
	Title    string `json:"title"`
	Post     string `json:"post"`
}
