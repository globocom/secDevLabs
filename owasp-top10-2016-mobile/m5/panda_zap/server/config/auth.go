package config

import (
	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m5/panda_zap/server/auth"
	"github.com/spf13/viper"
	"go.uber.org/zap"
)

// NewAuthSession returns a new authentication session.
func NewAuthSession(logger *zap.SugaredLogger, settings *viper.Viper) (auth.Auth, error) {
	authType := settings.GetString("auth_type")
	switch {
	case authType == "jwt":
		logger.Info("JWT auth method selected")
		return auth.NewJWTSession(logger, settings)
	default:
		logger.Info("Default auth method selected")
		return auth.NewJWTSession(logger, settings)
	}
}
