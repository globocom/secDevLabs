package config

// APIconfig holds all information regarding the project.
type APIconfig struct {
	MongoConf MongoConfig
}

// MongoConfig holds all information regarding MongoDB.
type MongoConfig struct {
	MongoPassword string `mapstructure:"password"`
	MongoUser     string `mapstructure:"username"`
	MongoDBName   string `mapstructure:"dbname"`
	MongoHost     string `mapstructure:"host"`
}

// Project configuration.
var (
	APIconfiguration = new(APIconfig)
)
