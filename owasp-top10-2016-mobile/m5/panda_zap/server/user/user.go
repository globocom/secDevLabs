package user

import (
	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m5/panda_zap/server/message"
)

// User is the struct that holds all user information.
type User struct {
	ID       string            `bson:"id" json:"id"`
	Name     string            `bson:"name" json:"name"`
	Messages []message.Message `bson:"messages" json:"messages"`
	Key      string            `bson:"key" json:"key"`
}

// New returns a new User
func New() *User {
	return &User{}
}
