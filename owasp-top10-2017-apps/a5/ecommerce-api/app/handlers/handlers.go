package handlers

import (
	"fmt"
	"net/http"
	"os"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/globocom/secDevLabs/owasp-top10-2017-apps/a5/ecommerce-api/app/db"
	"github.com/labstack/echo"
)

// HealthCheck is the heath check function.
func HealthCheck(c echo.Context) error {
	return c.String(http.StatusOK, "WORKING\n")
}

// GetTicket returns the userID ticket.
func GetTicket(c echo.Context) error {
	cookie, err := ReadCookie(c)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Error fetching tickets."})
	}

	token, _ := jwt.Parse(cookie, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method")
		}
		return []byte(os.Getenv("A5_SECRET")), nil
	})

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return c.JSON(http.StatusForbidden, map[string]string{"result": "error", "details": "Error fetching tickets."})
	}

	userID := claims["userid"]
	userDataQuery := map[string]interface{}{"userID": userID}
	userDataResult, err := db.GetUserData(userDataQuery)
	if err != nil {
		// could not find this user in MongoDB (or MongoDB err connection)
		return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Error finding this UserID."})
	}
	if claims["username"] != userDataResult.Username {
		return c.JSON(http.StatusForbidden, map[string]string{"result": "error", "details": "Error fetching tickets."})
	}
	return c.JSON(http.StatusOK, map[string]string{
		"result":   "success",
		"username": userDataResult.Username,
		"ticket":   userDataResult.Ticket,
	})
	msgTicket := fmt.Sprintf("Hey, %s! This is your ticket: %s\n", userDataResult.Username, userDataResult.Ticket)
	return c.String(http.StatusOK, msgTicket)
}
