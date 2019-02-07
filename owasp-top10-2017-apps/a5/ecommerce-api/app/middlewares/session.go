package middlewares

import (
	"fmt"
	"net/http"
	"os"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
)

// RequireLogin validates the session cookie and sets the username in the context
func RequireLogin(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		cookie, err := c.Cookie("sessionIDa5")
		if err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Invalid user cookie."})
		}

		token, err := jwt.Parse(cookie.Value, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
			}
			return []byte(os.Getenv("A5-JWT-SECRET")), nil
		})
		if err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Invalid user cookie."})
		}
		if !token.Valid {
			return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Invalid user cookie."})
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Invalid user cookie."})
		}

		username, ok := claims["name"]
		if !ok {
			return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Invalid user cookie."})
		}
		c.Set("username", username)
		return next(c)
	}
}
