package routes

import (
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m4/note-box/server/app/db"
	"github.com/labstack/echo"
)

// MyNotes returns all user's notes.
func MyNotes(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	username := claims["name"].(string)

	notes := db.FindNotes(username)

	return c.JSON(http.StatusOK, notes)
}
