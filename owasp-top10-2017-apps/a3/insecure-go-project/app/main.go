package main

import (
	"fmt"
	"os"
	"strconv"

	"github.com/globocom/secDevLabs/owasp-top10-2017-apps/a3/insecure-go-project/app/api"
	db "github.com/globocom/secDevLabs/owasp-top10-2017-apps/a3/insecure-go-project/app/db/mongo"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {

	fmt.Println("[*] Starting Insecure Go Project...")

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
