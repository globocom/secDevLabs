package routes

import (
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m4/note-box/server/app/db"
	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m4/note-box/server/app/types"
	"github.com/labstack/echo"
)

// AddNote attempts to add a new note in the database
func AddNote(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	jwtUsername := claims["name"].(string)

	receivedNote := new(types.Note)
	if err := c.Bind(receivedNote); err != nil {
		return c.JSON(http.StatusInternalServerError, "Error unmarshaling new note")
	}

	if jwtUsername != receivedNote.OwnerUsername {
		return c.JSON(http.StatusForbidden, "You can't add notes as "+receivedNote.OwnerUsername+"! You're logged in as "+jwtUsername)
	}

	err := db.InsertOneNote(receivedNote)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Error inserting new note into the database")
	}

	return c.JSON(http.StatusOK, "Note added successfully")
}
