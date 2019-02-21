package handlers

import (
	"fmt"
	"net/http"

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
	id := c.Param("id")
	userDataQuery := map[string]interface{}{"userID": id}
	cookie, err := c.Cookie("sessionIDa5")
	if err != nil {
		return fmt.Errorf("Error with cookie", err)
	}
	token, err := jwt.Parse(cookie.Value, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		// hmacSampleSecret is a []byte containing your secret, e.g. []byte("my_secret_key")
		return []byte("secret"), nil
	})

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		userDataResult, err := db.GetUserData(userDataQuery)
		if err != nil {
			// could not find this user in MongoDB (or MongoDB err connection)
			return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Error finding this UserID."})

		}
		if claims["name"] != userDataResult.Username {
			return c.JSON(http.StatusForbidden, map[string]string{"result": "error", "details": "I wont give you any error messages so you dont have hints to access my application"})
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
	return c.JSON(http.StatusForbidden, map[string]string{"result": "error", "details": "Error"})
}
