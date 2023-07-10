package routes

import (
	"net/http"

	"github.com/labstack/echo"
)

func Healthcheck(c echo.Context) error {
	return c.String(http.StatusOK, "Working!")
}
