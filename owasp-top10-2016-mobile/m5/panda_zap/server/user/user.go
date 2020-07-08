package user

import (
	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m5/panda_zap/server/message"
	"github.com/google/uuid"
)

// User is the struct that holds all user information.
type User struct {
	ID       string             `bson:"id" json:"id"`
	Name     string             `bson:"name" json:"name"`
	Key      string             `bson:"key" json:"key"`
	Messages *[]message.Message `bson:"messages" json:"messages"`
}

// New returns a new User
func New() *User {
	return &User{
		ID: uuid.New().String(),
	}
}
