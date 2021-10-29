package handlers

import (
	"fmt"
	"net/http"

	"github.com/globocom/secDevLabs/owasp-top10-2017-apps/a5/ecommerce-api/app/db"
	"github.com/labstack/echo"
)

// HealthCheck is the heath check function.
func HealthCheck(c echo.Context) error {
	return c.String(http.StatusOK, "WORKING\n")
}

// GetTicket returns the userID ticket.
func GetTicket(c echo.Context) error {
	id := c.Param("id")
	userDataQuery := map[string]interface{}{"userID": id}
	userDataResult, err := db.GetUserData(userDataQuery)
	if err != nil {
		// could not find this user in MongoDB (or MongoDB err connection)
		return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Error finding this UserID."})
	}

	format := c.QueryParam("format")
	if format == "json" {
		return c.JSON(http.StatusOK, map[string]string{
			"result":   "success",
			"username": userDataResult.Username,
			"ticket":   userDataResult.Ticket,
		})
	}

	msgTicket := fmt.Sprintf("Hey, %s! This is your ticket: %s\n", userDataResult.Username, userDataResult.Ticket)
	return c.String(http.StatusOK, msgTicket)
}
