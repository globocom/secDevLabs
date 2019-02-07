package types

// LoginAttempt is the struct that stores all data from a login attempt.
type LoginAttempt struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// UserData is the strucht that holds all data from user from MongoDB.
type UserData struct {
	Username       string `json:"username" bson:"username"`
	Password       string `json:"password" bson:"password"`
	RepeatPassword string `json:"repeat-password"`
	UserID         string `bson:"userID"`
}
