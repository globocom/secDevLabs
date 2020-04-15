package types

// User holds all user related information
type User struct {
	Username       string `bson:"username"`
	HashedPassword string `bson:"hashedPassword"`
	Salt           string `bson:"salt"`
	IsLoggedIn     bool   `bson:"isLoggedIn"`
}

// RequestUser holds user information form incomming requests
type RequestUser struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
