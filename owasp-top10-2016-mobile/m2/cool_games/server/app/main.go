package main

import (
	"log"

	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m2/cool_games/server/app/db"
	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m2/cool_games/server/app/routes"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {

	err := db.Connect()
	if err != nil {
		log.Fatal(err)
	}

	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// Login route
	e.POST("/login", routes.Login)

	// Register route
	e.POST("/register", routes.Register)

	// Healthcheck route
	e.GET("/healthcheck", routes.Healthcheck)

	e.Logger.Fatal(e.Start(":9051"))

	defer func() {
		cerr := db.Disconnect()
		if err == nil {
			err = cerr
		}
	}()
}
