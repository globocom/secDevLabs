package handlers

import (
	"net/http"

	"github.com/labstack/echo"
)

// FormPage reders login page
func FormPage(c echo.Context) error {
	return c.Render(http.StatusOK, "form.html", map[string]interface{}{
		"name": "Welcome to E-commerce!",
	})
}
