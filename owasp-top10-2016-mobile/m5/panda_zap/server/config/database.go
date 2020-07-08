package config

import (
	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m5/panda_zap/server/database"
	"github.com/spf13/viper"
	"go.uber.org/zap"
)

// NewDatabase returns a new database session.
func NewDatabase(logger *zap.SugaredLogger, settings *viper.Viper) (database.Database, error) {
	dbType := settings.GetString("database_type")
	switch {
	case dbType == "local":
		logger.Info("Local database selected")
		return database.NewGoCacheDBSession(logger, settings)
	default:
		logger.Info("Default database selected")
		return database.NewGoCacheDBSession(logger, settings)
	}
}
