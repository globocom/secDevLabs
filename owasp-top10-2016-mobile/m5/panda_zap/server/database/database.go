package database

import (
	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m5/panda_zap/server/message"
	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m5/panda_zap/server/user"
)

// Database is an interface resposible for handling a database.
type Database interface {
	Ping() error
	Close() error
	InsertUser(user *user.User, keyRemoval bool) error
	GetUser(username string) (*user.User, error)
	GetUserWithoutKeyWipe(username string) (*user.User, error)
	GetUserKey(username string) (string, error)
	UpdateUserMessages(username string, messages []message.Message) error
	UpdateUserKey(username string, newKey string) error
}
