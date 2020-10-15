package main

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

type storedComments struct {
	Text []string `json:"comments"`
}

type incommingComment struct {
	Text string `json:"comment"`
}

var comments storedComments

// GetComments returns the existing comments.
func GetComments(c echo.Context) error {
	fmt.Println("Retrieved comments with success")

	return c.JSON(http.StatusOK, comments)
}

// PostComments receives a new comment and stores it.
func PostComments(c echo.Context) error {
	var incomingComment *incommingComment

	if err := c.Bind(&incomingComment); err != nil {
		fmt.Println(err.Error())

		return c.JSON(http.StatusBadRequest,
			map[string]string{"result": "fail", "message": err.Error()})
	}

	comments.Text = append(comments.Text, incomingComment.Text)

	fmt.Println("New comment added")

	return c.JSON(http.StatusOK,
		map[string]string{"result": "success", "message": "New comment added"})
}

// Healthcheck returns WORKING if the API is up.
func Healthcheck(c echo.Context) error {
	return c.String(http.StatusOK, "WORKING")
}

func main() {
	e := echo.New()
	e.HideBanner = true
	DefaultCORSConfig := middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{http.MethodGet, http.MethodHead, http.MethodPut, http.MethodPatch, http.MethodPost, http.MethodDelete},
	}
	e.Use(middleware.CORSWithConfig(DefaultCORSConfig))

	e.GET("/healthcheck", Healthcheck)

	e.GET("/comments", GetComments)
	e.POST("/comments", PostComments)

	e.Logger.Fatal(e.Start(":10017"))
}
