package routes

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo"
)

// GetUserMessages returns all pending user messages.
func (es *EchoServer) GetUserMessages(c echo.Context) error {
	username := es.Auth.GetUser(c)

	userFromDB, err := es.Database.GetUserWithoutKeyWipe(username)
	if err != nil {
		es.Logger.Error("Error getting user from database: ", err)
		return c.JSON(http.StatusInternalServerError,
			map[string]string{"result": "fail", "message": err.Error()})
	}

	es.Logger.Info(fmt.Sprintf("Successfully got messages for user: '%s'", username))

	return c.JSON(http.StatusOK, userFromDB)
}

// UpdateMessages with ones yet to be delivered.
func (es *EchoServer) UpdateMessages(c echo.Context) error {

	var incomingUser *tmpUser
	if err := c.Bind(&incomingUser); err != nil {
		es.Logger.Warn("Error binding incoming update message user to tmpUser type", err)

		return c.JSON(http.StatusBadRequest,
			map[string]string{"result": "fail", "message": err.Error()})
	}

	if err := es.Database.UpdateUserMessages(incomingUser.Name, incomingUser.Messages); err != nil {
		es.Logger.Warn("Error updating user messages", err)

		return c.JSON(http.StatusInternalServerError,
			map[string]string{"result": "fail", "message": err.Error()})
	}

	es.Logger.Info("User messages updated successfully")
	return c.JSON(http.StatusOK,
		map[string]string{"result": "success", "message": "user messages update success"})
}
