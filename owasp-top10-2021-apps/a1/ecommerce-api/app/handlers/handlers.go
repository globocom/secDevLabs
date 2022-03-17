package handlers

import (
	"fmt"
	"net/http"
	"os"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/globocom/secDevLabs/owasp-top10-2021-apps/a1/ecommerce-api/app/db"
	types "github.com/globocom/secDevLabs/owasp-top10-2021-apps/a1/ecommerce-api/app/types"
	"github.com/labstack/echo"
)

// HealthCheck is the heath check function.
func HealthCheck(c echo.Context) error {
	return c.String(http.StatusOK, "WORKING\n")
}

// GetTicket returns the userID ticket.
func GetTicket(c echo.Context) error {
	id := c.Param("id")
	cookie, err := c.Cookie("sessionIDa5")
	if err != nil {
        return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Cookie Error."})
    }
	userDataQuery := map[string]interface{}{"userID": id}
	userDataResult, err := db.GetUserData(userDataQuery)
	if err != nil {
		// could not find this user in MongoDB (or MongoDB err connection)
		return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Error finding this UserID."})
	}
	
	claims := &types.Claims{}
	tkn, err := jwt.ParseWithClaims(cookie.Value, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_KEY")), nil
	})
	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			return c.JSON(http.StatusUnauthorized, map[string]string{"result": "error", "details": "Error StatusUnauthorized."})
		}
		return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Error StatusBadRequest."})
	}
	if !tkn.Valid {
		return c.JSON(http.StatusUnauthorized, map[string]string{"result": "error", "details": "Error StatusUnauthorized."})
	}

	if claims.Username == userDataResult.Username{
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
	return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Access denied."})
}
