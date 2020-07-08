package routes

import (
	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m5/panda_zap/server/database"
	"github.com/labstack/echo"
	"github.com/spf13/viper"
	"go.uber.org/zap"
)

// EchoServer is the struct that hold all relevant information for a new app.
type EchoServer struct {
	Logger   *zap.SugaredLogger
	Settings *viper.Viper
	Engine   *echo.Echo
	Database database.Database
}

// SetRoutes sets the server's routes.
func (es *EchoServer) SetRoutes() {

	// healthcheck route
	es.Engine.GET("/healthcheck", es.Healthcheck)

	// user routes
	es.Engine.POST("/user", es.RegisterUser)
	es.Engine.GET("/user/:name", es.GetUser)
	es.Engine.PUT("/user/messages", es.UpdateMessages)

	// key routes
	es.Engine.GET("/user/key/:name", es.GetUserKey)
	es.Engine.PUT("/user/key/:name", es.UpdateKey)
}
