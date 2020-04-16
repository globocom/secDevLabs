package routes

import (
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m4/note-box/server/app/db"
	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m4/note-box/server/app/types"
	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m4/note-box/server/app/util"
	"github.com/labstack/echo"
)

// Login attempts to loggin an user.
func Login(c echo.Context) error {
	jwtSecret := os.Getenv("M4_SECRET")

	u := new(types.RequestUser)
	if err := c.Bind(u); err != nil {
		return err
	}

	attemptUsername := strings.TrimSpace(u.Username)
	attemptPassword := strings.TrimSpace(u.Password)

	user, err := db.FindOneUser(attemptUsername)
	if err != nil {
		return c.JSON(http.StatusNotFound, "Username or password is wrong or the user doesn't exist")
	}

	if !util.VerifyHash(attemptPassword, user.HashedPassword, user.Salt) {
		return c.JSON(http.StatusNotFound, "Username or password is wrong or the user doesn't exist")
	}

	if user.IsLoggedIn {
		return c.JSON(http.StatusConflict, "User is already logged in!")
	}

	// Create token
	token := jwt.New(jwt.SigningMethodHS256)

	// Set claims
	claims := token.Claims.(jwt.MapClaims)
	claims["name"] = attemptUsername
	claims["exp"] = time.Now().Add(time.Hour * 72).Unix()

	// Generate encoded token and send it as response.
	t, err := token.SignedString([]byte(jwtSecret))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Error generating user token")
	}

	db.UpdateUserLoggedIn(attemptUsername, true)

	return c.JSON(http.StatusOK, echo.Map{
		"sessionToken": t,
	})
}
