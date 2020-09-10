package config

import (
	"go.uber.org/zap"
)

// NewLogger returns a new Zap sugar logger
func NewLogger() (*zap.SugaredLogger, error) {
	loggerConfig := zap.NewProductionConfig()
	loggerConfig.DisableStacktrace = true

	logger, err := loggerConfig.Build()
	if err != nil {
		return nil, err
	}
	sLogger := logger.Sugar()

	return sLogger, nil
}
