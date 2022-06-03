package handlers

import (
	"fmt"
	"net/http"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/globocom/secDevLabs/owasp-top10-2021-apps/a1/ecommerce-api/app/db"
	"github.com/labstack/echo"
)

type Claims struct {
	Username string `json:"name"`
	jwt.StandardClaims
}

// HealthCheck is the heath check function.
func HealthCheck(c echo.Context) error {
	return c.String(http.StatusOK, "WORKING\n")
}

// GetTicket returns the userID ticket.
func GetTicket(c echo.Context) error {
	id := c.Param("id")
	cookie, err := c.Cookie("sessionIDa5")
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Error to get cookie.\n"})
	}
	encodedToken := cookie.Value
	token, _, err := new(jwt.Parser).ParseUnverified(encodedToken, &Claims{})

	if err != nil {
		return err
	}

	userDataQuery := map[string]interface{}{"userID": id}
	userDataResult, err := db.GetUserData(userDataQuery)

	if claims, ok := token.Claims.(*Claims); ok {
		if claims.Username != userDataResult.Username {
			return c.JSON(http.StatusForbidden, map[string]string{"result": "forbidden", "details": "Token valitation error\n"})
		}
		fmt.Println(claims.Username)
	} else {
		fmt.Println(err)
	}

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
