package middlewares

import (
	"fmt"
	"net/http"
	"os"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

type (
	// JwtAuthenticationConfig defines the config for JwtAuthentication middleware.
	JwtAuthenticationConfig struct {
		// Skipper defines a function to skip middleware.
		Skipper middleware.Skipper
	}
)

var (
	// DefaultJwtAuthenticationConfig is the default BasicAuth middleware config.
	DefaultJwtAuthenticationConfig = JwtAuthenticationConfig{
		Skipper: middleware.DefaultSkipper,
	}
)

// JwtAuthenticationWithConfig returns an JwtAuthentication middleware with config.
func JwtAuthenticationWithConfig(config JwtAuthenticationConfig) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			if config.Skipper(c) {
				return next(c)
			}

			cookie, err := c.Cookie("sessionIDa5")
			if err != nil {
				return err
			}

			// thanks https://github.com/dgrijalva/jwt-go/blob/b08784ba5a75b9aad632ed9419326e4f5d7006b7/hmac_example_test.go#L49
			token, err := jwt.Parse(cookie.Value, func(token *jwt.Token) (interface{}, error) {
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
				}
				return []byte(os.Getenv("SECRET")), nil
			})

			if err != nil {
				return c.JSON(http.StatusForbidden, map[string]string{"result": "error", "details": "Invalid token."})
			}

			claims, ok := token.Claims.(jwt.MapClaims)
			if !ok || !token.Valid {
				return c.JSON(http.StatusForbidden, map[string]string{"result": "error", "details": "Invalid token."})
			}

			name, ok := claims["name"]
			if !ok {
				return c.JSON(http.StatusForbidden, map[string]string{"result": "error", "details": "Invalid token."})
			}

			c.Set("username", name)
			return next(c)
		}
	}
}

func JwtAuthentication() echo.MiddlewareFunc {
	return JwtAuthenticationWithConfig(DefaultJwtAuthenticationConfig)
}
