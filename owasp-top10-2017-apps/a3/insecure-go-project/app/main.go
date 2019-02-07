package main

import (
	"fmt"
	"os"
	"strconv"

	"github.com/globocom/secDevLabs/owasp-top10-2017-apps/a3/insecure-go-project/app/api"
	"github.com/globocom/secDevLabs/owasp-top10-2017-apps/a3/insecure-go-project/app/config"
	db "github.com/globocom/secDevLabs/owasp-top10-2017-apps/a3/insecure-go-project/app/db/mongo"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {

	fmt.Println("[*] Starting (now) Secure Go Project...")

	MONGO_PASSWORD := os.Getenv("MONGO_PASSWORD")
	MONGO_USER := os.Getenv("MONGO_USER")
	MONGO_DB_NAME := os.Getenv("MONGO_DB_NAME")
	MONGO_HOST := os.Getenv("MONGO_HOST")

	config.APIconfiguration.MongoConf.MongoPassword = MONGO_PASSWORD
	config.APIconfiguration.MongoConf.MongoUser = MONGO_USER
	config.APIconfiguration.MongoConf.MongoDBName = MONGO_DB_NAME
	config.APIconfiguration.MongoConf.MongoHost = MONGO_HOST

	// check if MongoDB is acessible and credentials received are working.
	if _, err := checkMongoDB(); err != nil {
		fmt.Println("[X] ERROR MONGODB: ", err)
		os.Exit(1)
	}

	fmt.Println("[*] MongoDB: OK!")

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
		apiPort = 9999
	}
	return apiPort
}

func checkMongoDB() (*db.DB, error) {
	return db.Connect()
}
