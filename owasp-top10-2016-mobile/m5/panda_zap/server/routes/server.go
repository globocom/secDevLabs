package routes

import (
	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m5/panda_zap/server/auth"
	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m5/panda_zap/server/database"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/spf13/viper"
	"go.uber.org/zap"
)

// EchoServer is the struct that hold all relevant information for a new app.
type EchoServer struct {
	Logger     *zap.SugaredLogger
	Settings   *viper.Viper
	Engine     *echo.Echo
	Database   database.Database
	Auth       auth.Auth
	MessageKey keyHolderV1
}

// SetGenericRoutes sets the server's generic routes.
func (es *EchoServer) SetGenericRoutes() {

	// healthcheck route
	es.Engine.GET("/healthcheck", es.Healthcheck)

	// user routes
	es.Engine.POST("/user", es.RegisterUser)
	es.Engine.GET("/user/:name", es.GetUser)

	// restricted messages routes
	r := es.Engine.Group("/messages")
	r.Use(middleware.JWT([]byte(es.Settings.GetString("jwt_secret"))))
	r.GET("", es.GetUserMessages)
	r.PUT("", es.UpdateMessages)
}

// SetRoutesV1 sets the server's routes for version 1.
func (es *EchoServer) SetRoutesV1() {

	// restricted key routes
	k := es.Engine.Group("/v1/key")
	k.Use(middleware.JWT([]byte(es.Settings.GetString("jwt_secret"))))
	k.GET("", es.GetKeyV1)
}

// SetRoutesV2 sets the server's routes for version 2.
func (es *EchoServer) SetRoutesV2() {

	// restricted key routes
	k := es.Engine.Group("/v2/user/key/")
	k.Use(middleware.JWT([]byte(es.Settings.GetString("jwt_secret"))))
	k.GET(":name", es.GetUserKeyV2)
	k.PUT("", es.UpdateUserKeyV2)
}
