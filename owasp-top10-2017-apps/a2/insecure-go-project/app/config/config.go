package config

// APIconfig holds all information regarding the project.
type APIconfig struct {
	MongoConf MongoConfig
}

// MongoConfig holds all information regarding MongoDB.
type MongoConfig struct {
	MongoPassword string //:= MONGO_PWD
	MongoUser     string //:= MONGO_USER
	MongoDBName   string //:= MONGO_DBNAME
	MongoHost     string //:= MONGO_HOST
}

// Project configuration.
var (
	APIconfiguration = new(APIconfig)
)
