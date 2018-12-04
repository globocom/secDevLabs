package handlers

import (
	"fmt"
	"net/http"
	"time"

	"github.com/labstack/echo"
)

// WriteCookie writes a cookie into echo Context
func WriteCookie(c echo.Context) error {
	cookie := new(http.Cookie)
	cookie.Name = "sessionIDa5"
	cookie.Value = "jon"
	cookie.Expires = time.Now().Add(24 * time.Hour)
	c.SetCookie(cookie)
	return c.String(http.StatusOK, "")
}

// ReadCookie reads a cookie from echo Context
func ReadCookie(c echo.Context) error {
	cookie, err := c.Cookie("username")
	if err != nil {
		return err
	}
	fmt.Println(cookie.Name)
	fmt.Println(cookie.Value)
	return c.String(http.StatusOK, "")
}
