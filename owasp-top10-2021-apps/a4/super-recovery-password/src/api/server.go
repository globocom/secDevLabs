package main

import (
	"api/database"
	"api/routes"
	"api/services"
	"errors"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {
	if err := checkAPIrequirements(); err != nil {
		fmt.Println("[x] Error starting API:")
		fmt.Println("[x]", err)
		os.Exit(1)
	}

	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:40001"},
		AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete, http.MethodOptions},
	}))

	e.GET("/healthcheck", routes.Healthcheck)
	e.POST("/userinfo", routes.UserInfo)
	e.POST("/register", routes.Register)
	e.POST("/login", routes.Login)
	e.POST("/recovery", routes.RecoveryPassword)

	r := e.Group("/reset")
	config := middleware.JWTConfig{
		Claims:     &services.JwtCustomClaims{},
		SigningKey: []byte(os.Getenv("JWT_SECRET")),
	}

	r.Use(middleware.JWTWithConfig(config))

	r.POST("", routes.ChangePassword)

	e.Logger.Fatal(e.Start(":3000"))
}

func checkAPIrequirements() error {

	if err := checkEnvVars(); err != nil {
		return err
	}
	fmt.Println("[*] Environment Variables: OK!")

	if err := initDB(); err != nil {
		return err
	}
	fmt.Println("[*] MySQL: Init DB OK!")

	return nil
}

func checkEnvVars() error {

	var envIsSet bool
	var allEnvIsSet bool
	var errorString string

	envVars := []string{
		"MYSQL_USER",
		"MYSQL_PASSWORD",
		"MYSQL_DATABASE",
		"JWT_SECRET",
	}

	env := make(map[string]string)
	allEnvIsSet = true
	for i := 0; i < len(envVars); i++ {
		env[envVars[i]], envIsSet = os.LookupEnv(envVars[i])
		if !envIsSet {
			errorString = errorString + envVars[i] + " "
			allEnvIsSet = false
		}
	}
	if allEnvIsSet == false {
		finalError := fmt.Sprintf("check environment variables: %s", errorString)
		return errors.New(finalError)
	}
	return nil
}

func initDB() error {

	timeout := time.After(1 * time.Minute)
	retryTick := time.Tick(15 * time.Second)

	fmt.Println("[*] Initiating DB...")

	for {
		select {
		case <-timeout:
			return errors.New("Error InitDB: timed out")
		case <-retryTick:
			err := database.InitDatabase()
			if err != nil {
				fmt.Println("Error InitDB: not ready yet")
			} else {
				return nil
			}
		}
	}
}
