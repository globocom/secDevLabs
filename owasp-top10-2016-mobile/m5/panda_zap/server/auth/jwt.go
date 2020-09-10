package auth

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
	"github.com/spf13/viper"
	"go.uber.org/zap"
)

// JWTInterface implements the Auth interface.
type JWTInterface struct {
	Logger      *zap.SugaredLogger
	Settings    *viper.Viper
	TokenConfig *jwt.Token
}

// NewJWTSession returns a new JWT session.
func NewJWTSession(logger *zap.SugaredLogger, settings *viper.Viper) (*JWTInterface, error) {
	logger.Info("New authentication session created successfully")

	tokenConfig := jwt.New(jwt.SigningMethodHS256)

	authSession := &JWTInterface{
		Logger:      logger,
		Settings:    settings,
		TokenConfig: tokenConfig,
	}

	return authSession, nil
}

// NewToken returns a new JWT
func (j *JWTInterface) NewToken(id string, username string) (string, error) {
	claims := j.TokenConfig.Claims.(jwt.MapClaims)
	claims["id"] = id
	claims["username"] = username

	token, err := j.TokenConfig.SignedString([]byte(j.Settings.GetString("jwt_secret")))
	if err != nil {
		return "", err
	}

	return token, nil
}

// GetUser returns the user from the JWT given the context.
func (j *JWTInterface) GetUser(c echo.Context) string {
	JWTToken := c.Get("user").(*jwt.Token)
	claims := JWTToken.Claims.(jwt.MapClaims)
	username := claims["username"].(string)

	return username
}
