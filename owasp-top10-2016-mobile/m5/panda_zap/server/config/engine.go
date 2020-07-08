package config

import (
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

// NewEchoEngine returns a new echo engine.
func NewEchoEngine() *echo.Echo {
	echoEngine := echo.New()
	echoEngine.HideBanner = true

	echoEngine.Use(middleware.Recover())
	echoEngine.Use(middleware.Secure())

	return echoEngine
}
