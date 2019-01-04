package main

import (
	"errors"
	"fmt"
	"log"
	"os"

	"github.com/globocom/secDevLabs/owasp-top10-2017-apps/a1/copy-n-paste/app/handlers"
	"github.com/globocom/secDevLabs/owasp-top10-2017-apps/a1/copy-n-paste/app/util"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/spf13/viper"
)

func main() {

	err := loadViper()
	if err != nil {
		log.Fatal(err)
	}

	if err := checkAPIrequirements(); err != nil {
		fmt.Println("[x] Error starting API:")
		fmt.Println("[x]", err)
		os.Exit(1)
	}

	if err := initDB(); err != nil {
		fmt.Println(err)
	}
	fmt.Println("[*] MySQL: Init DB OK!")

	echoInstance := echo.New()
	echoInstance.HideBanner = true

	echoInstance.Use(middleware.Logger())
	echoInstance.Use(middleware.Recover())
	echoInstance.Use(middleware.RequestID())

	echoInstance.POST("/login", handlers.Login)
	echoInstance.POST("/register", handlers.Register)
	echoInstance.GET("/healthcheck", handlers.HealthCheck)

	echoInstance.Logger.Fatal(echoInstance.Start(":3000"))
}

func checkAPIrequirements() error {

	if err := checkEnvVars(); err != nil {
		return err
	}
	fmt.Println("[*] Environment Variables: OK!")

	return nil
}

func loadViper() error {
	viper.SetConfigName("config")
	viper.AddConfigPath("./app/")
	err := viper.ReadInConfig()
	return err
}

func initDB() error {
	err := util.InitDatabase()
	return err
}

func checkEnvVars() error {

	var envIsSet bool
	var allEnvIsSet bool
	var errorString string

	envVars := []string{
		"MYSQL_USER",
		"MYSQL_PASSWORD",
		"MYSQL_DATABASE",
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
