package routes

import (
	"api/database"
	"api/services"
	"api/types"
	"net/http"
	"strings"

	"github.com/labstack/echo"
)

func Login(c echo.Context) (err error) {
	u := new(types.UserLogin)
	if err = c.Bind(u); err != nil {
		return
	}
	u.Login = strings.ToLower(u.Login)

	user := types.UserLogin{
		Login:    u.Login,
		Password: u.Password,
	}

	success, err := database.LoginUser(user.Login, user.Password)
	if !success {
		return c.JSON(http.StatusUnauthorized, echo.Map{
			"message": "Bad Credentials! User not authorized.",
		})
	}

	token, err := services.GenerateJwt(u.Login, false)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, echo.Map{
			"message": "Error to generate token.",
		})
	}

	return c.JSON(http.StatusOK, echo.Map{
		"token": token,
	})
}
