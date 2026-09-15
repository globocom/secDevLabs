package routes

import (
	"api/database"
	"api/services"
	"api/types"
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
)

func ChangePassword(c echo.Context) (err error) {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(*services.JwtCustomClaims)

	// Tokens de recuperacao nao podem mais trocar senha (fail closed).
	if claims.Recovery {
		return c.JSON(http.StatusForbidden, echo.Map{
			"message": "recovery tokens cannot be used to change passwords",
		})
	}

	u := new(types.ChangePassword)
	if err = c.Bind(u); err != nil {
		return
	}
	if u.Password != u.RepeatPassword {
		return c.JSON(http.StatusBadRequest, echo.Map{
			"message": "passwords don't match",
		})
	}

	if err = database.ChangePassword(claims.Name, u.Password, u.RepeatPassword); err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"message": "failed to change password",
		})
	}

	return c.JSON(http.StatusOK, echo.Map{"message": "success"})
}