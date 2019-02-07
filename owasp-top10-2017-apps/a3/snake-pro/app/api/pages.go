package api

import (
	"net/http"

	"github.com/labstack/echo"
)

// PageLogin renders login page
func PageLogin(c echo.Context) error {
	return c.Render(http.StatusOK, "form.html", map[string]interface{}{
		"name": "Welcome to SnakePro!",
	})
}

func PageRanking(c echo.Context) error {
	return c.Render(http.StatusOK, "ranking.html", map[string]interface{}{})
}

//PageGame renders the game page
func PageGame(c echo.Context) error {
	return c.Render(http.StatusOK, "game.html", map[string]interface{}{})
}
