package types

// LoginAttempt is the struct that stores all data from a login attempt.
type LoginAttempt struct {
	Username string `json:"user"`
	Password string `json:"pass"`
}

// UserData is the strucht that holds all data from user from MongoDB.
type UserData struct {
	Username       string `json:"user" bson:"username"`
	Password       string `json:"pass" bson:"password"`
	RepeatPassword string `json:"passcheck"`
	UserID         string `bson:"userID"`
	HighestScore   int    `bson:"highest-score"`
}
