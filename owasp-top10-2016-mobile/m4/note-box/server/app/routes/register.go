package routes

import (
	"net/http"
	"strings"

	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m4/note-box/server/app/db"
	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m4/note-box/server/app/types"
	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m4/note-box/server/app/util"
	"github.com/labstack/echo"
)

// Register tries to register a new user into the database
func Register(c echo.Context) error {
	u := new(types.RequestUser)
	if err := c.Bind(u); err != nil {
		return err
	}

	attemptUsername := strings.TrimSpace(u.Username)
	attemptPassword := strings.TrimSpace(u.Password)

	_, err := db.FindOneUser(attemptUsername)
	if err == nil {
		return c.JSON(http.StatusConflict, "User already exists!")
	}

	hashedPassword, salt, err := util.Hash(attemptPassword)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Error hashing user password, please try again later")
	}

	newUser := types.User{attemptUsername, hashedPassword, salt, false}

	err = db.InsertOneUser(newUser)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Error registering new user, please try again later")
	}

	return c.JSON(http.StatusOK, "User successfully registered!")
}
