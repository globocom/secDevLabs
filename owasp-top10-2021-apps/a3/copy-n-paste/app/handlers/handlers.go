package handlers

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo"

	"github.com/globocom/secDevLabs/owasp-top10-2021-apps/a3/copy-n-paste/app/types"
	"github.com/globocom/secDevLabs/owasp-top10-2021-apps/a3/copy-n-paste/app/util"
)

//HealthCheck is de health check function
func HealthCheck(c echo.Context) error {
	return c.String(http.StatusOK, "WORKING!")
}

//Login is the login function
func Login(c echo.Context) error {

	loginAttempt := types.LoginAttempt{}
	err := c.Bind(&loginAttempt)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Error binding login attempt."})
	}

	validUser, err := util.AuthenticateUser(loginAttempt.User, loginAttempt.Pass)
	if err != nil {
		msgUser := err.Error()
		return c.JSON(http.StatusBadRequest, msgUser)
	}

	if validUser {
		msgUser := fmt.Sprintf("Welcome, %s!", loginAttempt.User)
		return c.String(http.StatusOK, msgUser)
	}

	msgUser := fmt.Sprintf("User not found or wrong password!")
	return c.String(http.StatusBadRequest, msgUser)
}

//Register is the function to register a new user on bd
func Register(c echo.Context) error {

	RegisterAttempt := types.RegisterAttempt{}
	err := c.Bind(&RegisterAttempt)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Error binding register attempt."})
	}

	userCreated, err := util.NewUser(RegisterAttempt.User, RegisterAttempt.Pass, RegisterAttempt.PassCheck)
	if err != nil {
		msgUser := err.Error()
		return c.JSON(http.StatusOK, msgUser)
	}

	if userCreated {
		msgUser := fmt.Sprintf("User %s created!", RegisterAttempt.User)
		return c.String(http.StatusOK, msgUser)
	}

	msgUser := fmt.Sprintf("User already exists or passwords don't match!")
	return c.String(http.StatusOK, msgUser)
}
