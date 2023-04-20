package routes

import (
	"api/database"
	"api/types"
	"fmt"
	"net/http"
	"strings"

	"github.com/labstack/echo"
)

func Register(c echo.Context) (err error) {
	u := new(types.UserRegister)
	if err = c.Bind(u); err != nil {
		return
	}
	u.Login = strings.ToLower(u.Login)
	user := types.UserRegister{
		Login:          u.Login,
		Password:       u.Password,
		RepeatPassword: u.Password,
		FirstQuestion:  u.FirstQuestion,
		FirstAnswer:    u.FirstAnswer,
		SecondQuestion: u.SecondQuestion,
		SecondAnswer:   u.SecondAnswer,
	}

	success, err := database.RegisterUser(user.Login, user.Password, user.FirstQuestion, user.FirstAnswer, user.SecondQuestion, user.SecondAnswer)
	if !success {
		if err != nil {
			fmt.Print(err)
			return c.JSON(http.StatusInternalServerError, echo.Map{
				"message": "internal server error!",
			})
		}
		return c.JSON(http.StatusBadRequest, echo.Map{
			"message": "user already exists or invalid question!",
		})
	}

	return c.JSON(http.StatusOK, echo.Map{
		"message": "success",
	})
}
