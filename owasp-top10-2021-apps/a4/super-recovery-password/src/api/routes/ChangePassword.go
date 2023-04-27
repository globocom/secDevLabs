package routes

import (
	"api/database"
	"api/services"
	"api/types"
	"fmt"
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
)

func ChangePassword(c echo.Context) (err error) {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(*services.JwtCustomClaims)
	if claims.Recovery != true {
		return c.JSON(http.StatusOK, echo.Map{
			"message": "invalid token",
		})
	}

	u := new(types.ChangePassword)
	if err = c.Bind(u); err != nil {
		return
	}
	if u.Password != u.RepeatPassword {
		return c.JSON(http.StatusOK, echo.Map{
			"message": "password don`t match",
		})
	}

	password := types.ChangePassword{
		Password:       u.Password,
		RepeatPassword: u.RepeatPassword,
	}

	err = database.ChangePassword(claims.Name, password.Password, password.RepeatPassword)
	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusOK, echo.Map{
			"message": "failed to change password",
		})
	}

	return c.JSON(http.StatusOK, echo.Map{
		"message": "success",
	})
}
