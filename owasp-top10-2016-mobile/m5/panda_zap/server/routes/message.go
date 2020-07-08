package routes

import (
	"net/http"

	"github.com/labstack/echo"
)

// UpdateMessages user messages with ones yet to be delivered.
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

	es.Logger.Info("User messages updated successfully8")
	return c.JSON(http.StatusOK,
		map[string]string{"result": "success", "message": "user messages update success"})
}
