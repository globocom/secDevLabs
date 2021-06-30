package handlers

import (
	"fmt"
	"net/http"
	"os"

	"github.com/dgrijalva/jwt-go"
	"github.com/globocom/secDevLabs/owasp-top10-2017-apps/a5/ecommerce-api/app/db"
	"github.com/globocom/secDevLabs/owasp-top10-2017-apps/a5/ecommerce-api/app/types"
	"github.com/labstack/echo"
)

// HealthCheck is the heath check function.
func HealthCheck(c echo.Context) error {
	return c.String(http.StatusOK, "WORKING\n")
}

// GetTicket returns the userID ticket.
func GetTicket(c echo.Context) error {
	var JWT_SECRET_KEY = os.Getenv("JWT_SECRET_KEY")

	id := c.Param("id")

	cookie, err := c.Cookie("sessionIDa5")
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Error to get cookie.\n"})
	}
	encodedToken := cookie.Value
	token, err := jwt.ParseWithClaims(encodedToken, &types.Claims{}, func(beforeVerificationToken *jwt.Token) (interface{}, error) {
		if beforeVerificationToken.Method.Alg() != jwt.SigningMethodES256.Alg() {
			return nil, c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Error on signing method.\n"})
		}
		return []byte(JWT_SECRET_KEY), nil
	})
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "JWT Error.\n"})
	}

	claims := token.Claims.(*types.Claims)

	userDataQuery := map[string]interface{}{"userID": id}
	userDataResult, err := db.GetUserData(userDataQuery)

	if claims.Username != userDataResult.Username {
		return c.JSON(http.StatusForbidden, map[string]string{"result": "forbidden", "details": "You shall not pass!\n"})
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
