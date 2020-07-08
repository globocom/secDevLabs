package routes

import (
	"net/http"

	"github.com/labstack/echo"
)

// Healthcheck returns WORKING if the app is up and running.
func (es *EchoServer) Healthcheck(c echo.Context) error {
	return c.String(http.StatusOK, "WORKING")
}
