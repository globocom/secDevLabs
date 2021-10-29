package context

import (
	"fmt"
	"os"
	"strconv"
	"sync"
	"time"
)

// MongoConfig represents MongoDB configuration.
type MongoConfig struct {
	Address      string
	DatabaseName string
	Timeout      time.Duration
	Username     string
	Password     string
}

// APIConfig represents API configuration.
type APIConfig struct {
	MongoDBConfig *MongoConfig
	APIPort       int
}

var apiConfig *APIConfig
var onceConfig sync.Once

// GetAPIConfig returns the instance of an APIConfig.
func GetAPIConfig() *APIConfig {
	onceConfig.Do(func() {
		apiConfig = &APIConfig{
			MongoDBConfig: getMongoConfig(),
			APIPort:       getAPIPort(),
		}
	})
	return apiConfig
}

// getMongoConfig returns all MongoConfig retrieved from environment variables.
func getMongoConfig() *MongoConfig {

	mongoHost := os.Getenv("MONGO_HOST")
	mongoDatabaseName := os.Getenv("MONGO_DATABASE_NAME")
	mongoUserName := os.Getenv("MONGO_DATABASE_USERNAME")
	mongoPassword := os.Getenv("MONGO_DATABASE_PASSWORD")
	mongoTimeout := getMongoTimeout()
	mongoPort := getMongoPort()
	mongoAddress := fmt.Sprintf("%s:%d", mongoHost, mongoPort)

	return &MongoConfig{
		Address:      mongoAddress,
		DatabaseName: mongoDatabaseName,
		Timeout:      mongoTimeout,
		Username:     mongoUserName,
		Password:     mongoPassword,
	}
}

// getAPIPort returns the API port retrieved from an environment variable.
func getAPIPort() int {
	apiPort, err := strconv.Atoi(os.Getenv("API_PORT"))
	if err != nil {
		apiPort = 10005
	}
	return apiPort
}

func getMongoTimeout() time.Duration {
	mongoTimeout, err := strconv.Atoi(os.Getenv("MONGO_TIMEOUT"))
	if err != nil {
		return time.Duration(60) * time.Second
	}
	return time.Duration(mongoTimeout) * time.Second
}

// getMongoPort returns the port used by MongoDB retrieved from an environment variable.
func getMongoPort() int {
	mongoPort, err := strconv.Atoi(os.Getenv("MONGO_PORT"))
	if err != nil {
		return 27017
	}
	return mongoPort
}
