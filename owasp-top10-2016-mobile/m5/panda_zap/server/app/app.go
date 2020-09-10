package app

import (
	"context"
	"fmt"
	"time"

	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m5/panda_zap/server/auth"
	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m5/panda_zap/server/database"
	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m5/panda_zap/server/routes"
	"github.com/spf13/viper"
	"go.uber.org/fx"
	"go.uber.org/zap"
)

// Application is the struct that hold all relevant information for a new app.
type Application struct {
	Logger   *zap.SugaredLogger
	Settings *viper.Viper
	Server   *routes.EchoServer
	Database database.Database
	Auth     auth.Auth
}

// Begin starts a new app.
func Begin(lifecycle fx.Lifecycle, logger *zap.SugaredLogger, settings *viper.Viper, server *routes.EchoServer, database database.Database, auth auth.Auth) {
	application := &Application{
		Logger:   logger,
		Settings: settings,
		Server:   server,
		Database: database,
		Auth:     auth,
	}

	lifecycle.Append(
		fx.Hook{
			OnStart: func(context.Context) error {
				application.Logger.Info("Starting the application")
				application.Server.SetGenericRoutes()
				application.Server.SetRoutesV1()
				go application.Server.Engine.Start(fmt.Sprintf(":%d", application.Settings.GetInt("port")))
				return nil
			},
			OnStop: func(context.Context) error {
				application.Logger.Info("Stopping the application")
				ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
				defer cancel()

				err := application.Server.Engine.Shutdown(ctx)
				if err != nil {
					application.Logger.Error(err)
					return err
				}
				return nil
			},
		},
	)
}
