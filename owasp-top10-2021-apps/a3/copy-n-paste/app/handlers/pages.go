package handlers

import (
	"net/http"

	"github.com/labstack/echo"
)

// PageLogin renders login page
func PageLogin(c echo.Context) error {
	return c.Render(http.StatusOK, "form.html", map[string]interface{}{
		"name": "Welcome to CopyNPaste API demo page!",
	})
}
