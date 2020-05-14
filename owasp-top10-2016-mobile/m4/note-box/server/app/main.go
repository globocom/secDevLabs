package main

import (
	"log"
	"os"

	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m4/note-box/server/app/db"
	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m4/note-box/server/app/routes"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {

	err := db.Connect()
	if err != nil {
		log.Fatal(err)
	}

	jwtSecret := os.Getenv("M4_SECRET")
	jwtMiddleware := middleware.JWT([]byte(jwtSecret))

	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// Login route
	e.POST("/login", routes.Login)

	// Logout route
	e.POST("/logout", routes.Logout, jwtMiddleware)

	// Register route
	e.POST("/register", routes.Register)

	// Get user notes
	r := e.Group("/notes")
	r.Use(jwtMiddleware)
	r.GET("/mynotes", routes.MyNotes)
	r.POST("/addnote", routes.AddNote)

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
