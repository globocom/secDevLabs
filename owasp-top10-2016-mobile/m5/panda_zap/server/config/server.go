package config

import (
	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m5/panda_zap/server/auth"
	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m5/panda_zap/server/database"
	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m5/panda_zap/server/routes"
	"github.com/labstack/echo"
	"github.com/spf13/viper"
	"go.uber.org/zap"
)

// NewEchoServer returns a new echo server.
func NewEchoServer(logger *zap.SugaredLogger, settings *viper.Viper, engine *echo.Echo, database database.Database, auth auth.Auth) *routes.EchoServer {
	return &routes.EchoServer{
		Logger:   logger,
		Settings: settings,
		Engine:   engine,
		Database: database,
		Auth:     auth,
	}
}
