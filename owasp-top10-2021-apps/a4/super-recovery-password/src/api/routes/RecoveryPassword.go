package routes

import (
	"api/database"
	"api/services"
	"api/types"
	"fmt"
	"net/http"
	"strings"
	"api/security"
	"time"

	"github.com/labstack/echo"
)

var recoveryLimiter = security.NewRateLimiter(5, 15*time.Minute)


func RecoveryPassword(c echo.Context) (err error) {
	u := new(types.RecoveryPasswordAnswers)
	if err = c.Bind(u); err != nil {
		return
	}
	u.Login = strings.ToLower(u.Login)
	if !recoveryLimiter.Allow(u.Login) {
		return c.JSON(http.StatusTooManyRequests, echo.Map{
			"message": "too many attempts. Try again later.",
		})
	}
	recoveryPasswordAnswers := types.RecoveryPasswordAnswers{
		Login:        u.Login,
		FirstAnswer:  u.FirstAnswer,
		SecondAnswer: u.SecondAnswer,
	}

	answers, err := database.RecoveryPassword(recoveryPasswordAnswers.Login, recoveryPasswordAnswers.FirstAnswer, recoveryPasswordAnswers.SecondAnswer)
	if err != nil {
		recoveryLimiter.RecordFailure(u.Login)
		return c.JSON(http.StatusConflict, echo.Map{"message": "incorrect answers!"})
	}

	if answers.FirstAnswer != recoveryPasswordAnswers.FirstAnswer || answers.SecondAnswer != recoveryPasswordAnswers.SecondAnswer {
		recoveryLimiter.RecordFailure(u.Login)
		return c.JSON(http.StatusConflict, echo.Map{"message": "incorrect answers!"})
	}
	recoveryLimiter.Reset(u.Login)
	
	token, err := services.GenerateJwt(recoveryPasswordAnswers.Login, true)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, echo.Map{
			"token": "Error to generate token.",
		})
	}
	fmt.Println(token)
	return c.JSON(http.StatusOK, echo.Map{
		"token": token,
	})
}
