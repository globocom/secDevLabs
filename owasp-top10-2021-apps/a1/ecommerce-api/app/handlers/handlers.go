package handlers

import (
	"fmt"
	"net/http"

	"github.com/globocom/secDevLabs/owasp-top10-2021-apps/a1/ecommerce-api/app/db"
	"github.com/labstack/echo"
)

// HealthCheck is the heath check function.
func HealthCheck(c echo.Context) error {
	return c.String(http.StatusOK, "WORKING\n")
}

// This func returns the user's ticket
// Get the user id from the request parameters.
// Validate if the token doesnt expire.
// Get the username and search in the db the userID from the token (JWT) in the authenticated session cookie.
// Compare the userID from the token with the userID from the URL.
// Return the ticket if the userID matches.
// This func returns the authenticated user's ticket.
func GetTicket(c echo.Context) error {
    // Get the requested userID from the URL parameters.
    requestedID := c.Param("id")

    // Validate the JWT from the authenticated session cookie.
    claims, err := TokenValid(c)
    if err != nil {
        return c.JSON(http.StatusUnauthorized, map[string]string{
            "result":  "error",
            "details": "Invalid or expired session.",
        })
    }

    // Get the username stored in the JWT claim "name".
    username, ok := claims["name"].(string)
    if !ok {
        return c.JSON(http.StatusUnauthorized, map[string]string{
            "result":  "error",
            "details": "Invalid session.",
        })
    }

    // Search the database for the authenticated user.
    authenticatedUserQuery := map[string]interface{}{
        "username": username,
    }

    authenticatedUser, err := db.GetUserData(authenticatedUserQuery)
    if err != nil {
        return c.JSON(http.StatusUnauthorized, map[string]string{
            "result":  "error",
            "details": "Authenticated user not found.",
        })
    }

    // Compare the authenticated user's UserID
    // with the userID requested in the URL.
    if authenticatedUser.UserID != requestedID {
        return c.JSON(http.StatusForbidden, map[string]string{
            "result":  "error",
            "details": "You are not authorized to access this ticket.",
        })
    }

    // The user is authenticated and authorized.
    // Now it is safe to return the ticket.
    format := c.QueryParam("format")

    if format == "json" {
        return c.JSON(http.StatusOK, map[string]string{
            "result":   "success",
            "username": authenticatedUser.Username,
            "ticket":   authenticatedUser.Ticket,
        })
    }

    msgTicket := fmt.Sprintf(
        "Hey, %s! This is your ticket: %s\n",
        authenticatedUser.Username,
        authenticatedUser.Ticket,
    )

    return c.String(http.StatusOK, msgTicket)
}