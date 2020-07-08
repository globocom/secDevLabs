package config

import "go.uber.org/zap"

// NewLogger returns a new Zap sugar logger
func NewLogger() (*zap.SugaredLogger, error) {
	logger, err := zap.NewProduction()
	if err != nil {
		return nil, err
	}

	slogger := logger.Sugar()

	return slogger, nil
}
