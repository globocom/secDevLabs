package database

import (
	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m5/panda_zap/server/user"
)

// Database is an interface resposible for handling a database.
type Database interface {
	Ping() error
	Close() error
	InsertUser(user *user.User) error
	GetUser(username string) (*user.User, error)
}
