package main

import (
	"errors"
	"fmt"
	"log"
	"os"
	"time"

	"camp-lake-api/context"
	"camp-lake-api/db"
	"camp-lake-api/handlers"
	"camp-lake-api/types"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
)

func CreateFakeToken() (string, error) {
	expirationTime := time.Now().Add(5 * time.Minute)
	claims := &types.Claims{
		Username: "jasonVoorhess",
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodNone, claims)
	tokenString, err := token.SignedString(jwt.UnsafeAllowNoneSignatureType)
	if err != nil {
		log.Fatal(err)
	}
	return tokenString, nil
}

func checkRequirements(configAPI *context.APIConfig) error {
	// check if all environment variables are properly set.
	if err := checkEnvVars(); err != nil {
		return err
	}
	// check if MongoDB is accessible and credentials received are working.
	if err := checkMongoDB(); err != nil {
		return err
	}

	return nil
}

func checkEnvVars() error {
	envVars := []string{
		"MONGO_HOST",
		"MONGO_DATABASE_NAME",
		"MONGO_DATABASE_USERNAME",
		"MONGO_DATABASE_PASSWORD",
		"JWT_SECRET",
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

func main() {
	configAPI := context.GetAPIConfig()
	if err := checkRequirements(configAPI); err != nil {
		log.Fatalf("Error: %v\n", err)
		os.Exit(1)
	}

	echoInstance := echo.New()
	echoInstance.HideBanner = true

	fakeUser, _ := CreateFakeToken()
	log.Printf("Fake Token %s", fakeUser)

	echoInstance.GET("/healthcheck", handlers.HealthCheck)
	echoInstance.POST("/register", handlers.NewUser)
	echoInstance.POST("/login", handlers.Login)
	echoInstance.POST("/newpost", handlers.NewPost)

	APIport := fmt.Sprintf(":%d", configAPI.APIPort)
	echoInstance.Logger.Fatal(echoInstance.Start(APIport))
}
