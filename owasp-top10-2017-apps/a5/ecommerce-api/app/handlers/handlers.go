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
	id := c.Param("id")
	userDataQuery := map[string]interface{}{"userID": id}
	sessionID, err := c.Cookie("sessionIDa5")
	if err != nil {
		return c.JSON(http.StatusForbidden, map[string]string{"result": "error", "details": "Invalid credentials"})
	}
	token, err := jwt.Parse(sessionID.Value, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}

		// hmacSampleSecret is a []byte containing your secret, e.g. []byte("my_secret_key")
		return []byte(os.Getenv("SECRET_KEY")), nil
	})

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {

		userDataResult, err := db.GetUserData(userDataQuery)
		if err != nil {
			// could not find this user in MongoDB (or MongoDB err connection)
			return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Username"})
		}

		if claims["name"] != userDataResult.Username {
			return c.JSON(http.StatusForbidden, map[string]string{"result": "error", "details": "You have entered an invalid username or password"})
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