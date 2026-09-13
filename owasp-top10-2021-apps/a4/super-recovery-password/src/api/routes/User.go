package routes

import (
	"net/http"
	"github.com/labstack/echo"
)

func UserInfo(c echo.Context) (err error) {
	return c.JSON(http.StatusForbidden, echo.Map{
		"message": "user information is not available",
	})
}