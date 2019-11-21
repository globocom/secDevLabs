package main

import (
	"errors"
	"fmt"
	"os"
	"strconv"

	"github.com/globocom/secDevLabs/owasp-top10-2017-apps/a2/insecure-go-project/app/api"
	db "github.com/globocom/secDevLabs/owasp-top10-2017-apps/a2/insecure-go-project/app/db/mongo"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {

	fmt.Println("[*] Starting Insecure Go Project...")

	if err := checkEnvVars(); err != nil {
		fmt.Println("[X] ERROR ENV VARS: ", err)
		os.Exit(1)
	}

	// check if MongoDB is acessible and credentials received are working.
	if _, err := checkMongoDB(); err != nil {
		fmt.Println("[X] ERROR MONGODB: ", err)
		os.Exit(1)
	}

	fmt.Println("[*] MongoDB: OK!")
	fmt.Println("[*] Viper loaded: OK!")

	echoInstance := echo.New()
	echoInstance.HideBanner = true

	echoInstance.Use(middleware.Logger())
	echoInstance.Use(middleware.Recover())
	echoInstance.Use(middleware.RequestID())

	echoInstance.GET("/healthcheck", api.HealthCheck)
	APIport := fmt.Sprintf(":%d", getAPIPort())
	echoInstance.Logger.Fatal(echoInstance.Start(APIport))
}

func errorAPI(err error) {
	fmt.Println("[x] Error starting Insecure Go Project:")
	fmt.Println("[x]", err)
	os.Exit(1)
}

func getAPIPort() int {
	apiPort, err := strconv.Atoi(os.Getenv("API_PORT"))
	if err != nil {
		apiPort = 10002
	}
	return apiPort
}

func checkMongoDB() (*db.DB, error) {
	return db.Connect()
}

func checkEnvVars() error {

	envVars := []string{
		"MONGO_DB_NAME",
		"MONGO_DB_HOST",
		"MONGO_DB_PASSWORD",
		"MONGO_DB_USERNAME",
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

	if !allEnvIsSet {
		finalError := fmt.Sprintf("Check environment variables: %s", errorString)
		return errors.New(finalError)
	}

	return nil
}
