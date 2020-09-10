package auth

import "github.com/labstack/echo"

// Auth is an interface resposible for handling an authentication.
type Auth interface {
	NewToken(id string, username string) (string, error)
	GetUser(c echo.Context) string
}
