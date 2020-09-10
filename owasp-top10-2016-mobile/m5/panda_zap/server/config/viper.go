package config

import (
	"github.com/spf13/viper"
)

// NewViper retuns a new Viper instance and an error
func NewViper() (*viper.Viper, error) {

	viperInstance := viper.New()
	viperInstance.SetEnvPrefix("M5")
	viperInstance.AutomaticEnv()

	// API default values
	viperInstance.SetDefault("port", 11005)

	// Database default values
	viperInstance.SetDefault("database_type", "local")

	// Authentication default values
	viperInstance.SetDefault("auth_type", "jwt")

	return viperInstance, nil
}
