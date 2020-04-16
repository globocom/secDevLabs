package routes

import (
	"net/http"

	"github.com/labstack/echo"
)

// Healthcheck returns WORKING! if the API is up and running
func Healthcheck(c echo.Context) error {
	return c.JSON(http.StatusOK, "WORKING")
}
