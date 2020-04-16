package routes

import (
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m4/note-box/server/app/db"
	"github.com/labstack/echo"
)

// Logout attempts to logout an user
func Logout(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	username := claims["name"].(string)

	err := db.UpdateUserLoggedIn(username, false)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Error logging out user")
	}

	return c.JSON(http.StatusOK, "User logged out successfully")
}
