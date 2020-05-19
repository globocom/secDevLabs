package handlers

import (
	"fmt"
	"net/http"
	"os"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/globocom/secDevLabs/owasp-top10-2017-apps/a5/ecommerce-api/app/db"
	"github.com/labstack/echo"
)

var JWT_SECRET = os.Getenv("JWT_SECRET")

type Claims struct {
	Name string `json:"name"`
	jwt.StandardClaims
}

func GetToken(c echo.Context) (*Claims, error) {
	cookie, err := c.Cookie("sessionIDa5")
	if err != nil {
		return nil, c.JSON(http.StatusUnauthorized, map[string]string{"result": "error", "details": "Access denied."})
	}

	claims := &Claims{}
	token, err := jwt.ParseWithClaims(cookie.Value, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(JWT_SECRET), nil
	})
	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			return nil, c.JSON(http.StatusUnauthorized, map[string]string{"result": "error", "details": "Access denied."})
		}
		return nil, c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Error bad request."})
	}

	if !token.Valid {
		return nil, c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Error bad request."})
	}

	return claims, nil
}

// HealthCheck is the heath check function.
func HealthCheck(c echo.Context) error {
	return c.String(http.StatusOK, "WORKING\n")
}

// GetTicket returns the userID ticket.
func GetTicket(c echo.Context) error {
	token, err := GetToken(c)
	if token == nil {
		return err
	}

	id := c.Param("id")
	userDataQuery := map[string]interface{}{"userID": id}
	userDataResult, err := db.GetUserData(userDataQuery)
	if err != nil || userDataResult.Username != token.Name {
		// could not find this user in MongoDB (or MongoDB err connection)
		return c.JSON(http.StatusUnauthorized, map[string]string{"result": "error", "details": "Access denied."})
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
