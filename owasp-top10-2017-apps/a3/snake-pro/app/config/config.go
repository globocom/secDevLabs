package config

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
