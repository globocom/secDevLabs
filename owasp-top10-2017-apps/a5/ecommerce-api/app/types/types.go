package types

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
	Ticket         string `json:"ticket"`
}
