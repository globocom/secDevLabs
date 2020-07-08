package database

import (
	"errors"

	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m5/panda_zap/server/message"
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

// removeKey attempts to remove a given user's key from the database.
func (gc *GoCacheDB) removeKey(user *user.User) error {
	keylessUser := user
	keylessUser.Key = ""

	if err := gc.InsertUser(keylessUser); err != nil {
		return err
	}

	gc.Logger.Info("User key removed from database")
	return nil
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
	gc.Logger.Info("User inserted into the database")

	return nil
}

// GetUser returns a user from the database.
func (gc *GoCacheDB) GetUser(username string) (*user.User, error) {

	userFromDBInterface, found := gc.Session.Get(username)
	if !found {
		gc.Logger.Warn("User not present in the database")
		return nil, errors.New("User not present in the database")
	}
	gc.Logger.Info("Got user from the database")

	userFromDB := userFromDBInterface.(*user.User)

	keyLessUser := &user.User{
		ID:       userFromDB.ID,
		Name:     userFromDB.Name,
		Key:      "",
		Messages: userFromDB.Messages,
	}

	if err := gc.removeKey(keyLessUser); err != nil {
		gc.Logger.Warn("Error removing user key from database")
	}

	return userFromDB, nil
}

// GetUserKey returns the key of a given user.
func (gc *GoCacheDB) GetUserKey(username string) (string, error) {

	userFromDBInterface, found := gc.Session.Get(username)
	if !found {
		gc.Logger.Warn("User not present in the database")
		return "", errors.New("User not present in the database")
	}
	gc.Logger.Info("Got user key from the database")

	userFromDB := userFromDBInterface.(*user.User)

	keyLessUser := &user.User{
		ID:       userFromDB.ID,
		Name:     userFromDB.Name,
		Key:      "",
		Messages: userFromDB.Messages,
	}

	if err := gc.removeKey(keyLessUser); err != nil {
		gc.Logger.Warn("Error removing user key from database")
	}

	return userFromDB.Key, nil
}

// UpdateUserMessages attempts to update messages from a given user.
func (gc *GoCacheDB) UpdateUserMessages(username string, messages *[]message.Message) error {

	userFromDBInterface, found := gc.Session.Get(username)
	if !found {
		gc.Logger.Warn("User not present in the database")
		return errors.New("User not present in the database")
	}

	userFromDB := userFromDBInterface.(*user.User)
	userFromDB.Messages = messages

	gc.Session.Set(username, userFromDB, cache.NoExpiration)
	gc.Logger.Info("User messages updated")

	return nil
}

// UpdateUserKey attempts to update messages from a given user.
func (gc *GoCacheDB) UpdateUserKey(username string, newKey string) error {

	userFromDBInterface, found := gc.Session.Get(username)
	if !found {
		gc.Logger.Warn("User not present in the database")
		return errors.New("User not present in the database")
	}

	userFromDB := userFromDBInterface.(*user.User)
	userFromDB.Key = newKey

	gc.Session.Set(username, userFromDB, cache.NoExpiration)
	gc.Logger.Info("User key updated")

	return nil
}
