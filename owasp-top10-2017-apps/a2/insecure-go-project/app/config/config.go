package config

import (
	"fmt"
	"os"
)

// APIconfig holds all information regarding the project.
type APIconfig struct {
	MongoConf MongoConfig
}

// MongoConfig holds all information regarding MongoDB.
type MongoConfig struct {
	MongoPassword string
	MongoUser     string
	MongoDBName   string
	MongoHost     string
}

// Project configuration.
var (
	APIconfiguration = new(APIconfig)
)

func ReadFromEnv() error {
	mongoPassword, ok := os.LookupEnv("MONGO_PASSWORD")
	if !ok {
		return fmt.Errorf("MONGO_PASSWORD environment variable is not set")
	}
	APIconfiguration.MongoConf.MongoPassword = mongoPassword

	mongoUser, ok := os.LookupEnv("MONGO_USER")
	if !ok {
		return fmt.Errorf("MONGO_USER environment variable is not set")
	}
	APIconfiguration.MongoConf.MongoUser = mongoUser

	mongoDBName, ok := os.LookupEnv("MONGO_DBNAME")
	if !ok {
		return fmt.Errorf("MONGO_DBNAME environment variable is not set")
	}
	APIconfiguration.MongoConf.MongoDBName = mongoDBName

	mongoHost, ok := os.LookupEnv("MONGO_HOST")
	if !ok {
		return fmt.Errorf("MONGO_HOST environment variable is not set")
	}
	APIconfiguration.MongoConf.MongoHost = mongoHost

	return nil
}
