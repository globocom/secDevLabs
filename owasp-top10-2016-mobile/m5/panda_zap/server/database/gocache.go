package database

import (
	"fmt"

	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m5/panda_zap/server/user"
	"github.com/patrickmn/go-cache"
	"github.com/spf13/viper"
	"go.uber.org/zap"
)

// GoCacheDB implements the Database interface.
type GoCacheDB struct {
	Logger  *zap.SugaredLogger
	Session *cache.Cache
}

// NewGoCacheDBSession returns a new Go Cache session.
func NewGoCacheDBSession(logger *zap.SugaredLogger, settings *viper.Viper) (*GoCacheDB, error) {
	c := cache.New(cache.NoExpiration, -1)
	logger.Info("New Go Cache database created successfully")

	databaseSession := &GoCacheDB{
		Logger:  logger,
		Session: c,
	}

	return databaseSession, nil
}

// Ping returns nil if the database could be pinged.
func (gc *GoCacheDB) Ping() error {

	// Local database.
	return nil
}

// Close returns nil if the database was successfully closed.
func (gc *GoCacheDB) Close() error {

	// Local database.
	return nil
}

// InsertUser returns nil if an user was inserted successfully.
func (gc *GoCacheDB) InsertUser(user *user.User) error {

	gc.Session.Set(user.Name, user, cache.NoExpiration)

	return nil
}

// GetUser returns an user from the database.
func (gc *GoCacheDB) GetUser(username string) (*user.User, error) {

	userFromDBInterface, found := gc.Session.Get(username)
	if !found {
		return nil, fmt.Errorf("User '%s' not found in the database", username)
	}

	userFromDB := userFromDBInterface.(*user.User)

	return userFromDB, nil
}
