package main

import (
	"errors"
	"fmt"
	"os"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	apiContext "github.com/rafaveira3/secDevLabs/a5-ecommerce-api/context"
	"github.com/rafaveira3/secDevLabs/a5-ecommerce-api/db"
	"github.com/rafaveira3/secDevLabs/a5-ecommerce-api/handlers"
)

func main() {

	configAPI := apiContext.GetAPIConfig()

	if err := checkRequirements(configAPI); err != nil {
		// glbgelf.Logger.SendLog(map[string]interface{}{
		// 	"action": "main",
		// 	"info":   "SERVER"}, "ERROR", "Error starting Husky:", err)
		os.Exit(1)
	}

	echoInstance := echo.New()
	echoInstance.HideBanner = true

	echoInstance.Use(middleware.Logger())
	echoInstance.Use(middleware.Recover())
	echoInstance.Use(middleware.RequestID())

	echoInstance.GET("/healthcheck", handlers.HealthCheck)

	APIport := fmt.Sprintf(":%d", configAPI.APIPort)
	echoInstance.Logger.Fatal(echoInstance.Start(APIport))

}

func checkRequirements(configAPI *apiContext.APIConfig) error {

	// check if all environment variables are properly set.
	if err := checkEnvVars(); err != nil {
		return err
	}

	// glbgelf.Logger.SendLog(map[string]interface{}{
	// 	"action": "checkRequirements",
	// 	"info":   "SERVER"}, "INFO", "Environment Variables: OK!")

	// check if MongoDB is acessible and credentials received are working.
	if err := checkMongoDB(); err != nil {
		return err
	}

	// glbgelf.Logger.SendLog(map[string]interface{}{
	// 	"action": "checkRequirements",
	// 	"info":   "SERVER"}, "INFO", "MongoDB: OK!")

	return nil
}

func checkEnvVars() error {

	envVars := []string{
		"MONGO_HOST",
		"MONGO_DATABASE_NAME",
		"MONGO_DATABASE_USERNAME",
		"MONGO_DATABASE_PASSWORD",
	}

	var envIsSet bool
	var allEnvIsSet bool
	var errorString string

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

func checkMongoDB() error {

	_, err := db.Connect()

	if err != nil {
		mongoError := fmt.Sprintf("check mongoDB: %s", err)
		return errors.New(mongoError)
	}

	return nil
}
