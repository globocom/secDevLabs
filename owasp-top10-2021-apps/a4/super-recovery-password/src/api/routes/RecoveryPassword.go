package routes

import ("net/http"

	"github.com/labstack/echo"
)
func RecoveryPassword(c echo.Context) (err error) {
	return c.JSON(http.StatusForbidden, echo.Map{
		"message": "password recovery is disabled",
	})
}