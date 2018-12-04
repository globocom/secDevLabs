package handlers

import (
	"net/http"

	"github.com/labstack/echo"
)

// HealthCheck is the heath check function.
func HealthCheck(c echo.Context) error {
	err := WriteCookie(c)
	if err != nil {
		return c.String(http.StatusInternalServerError, "Internal Error\n")
	}
	return c.String(http.StatusOK, "WORKING\n")
}
