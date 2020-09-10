package routes

import (
	"fmt"
	"net/http"

	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m5/panda_zap/server/message"
	"github.com/labstack/echo"
)

// GetUserMessages returns all pending user messages.
func (es *EchoServer) GetUserMessages(c echo.Context) error {

	username := es.Auth.GetUser(c)

	userFromDB, err := es.Database.GetUser(username)
	if err != nil {
		es.Logger.Error("Error getting user from database: ", err)
		return c.JSON(http.StatusInternalServerError,
			map[string]string{"result": "fail", "message": err.Error()})
	}

	messagesToBeSent := userFromDB.Messages
	userFromDB.Messages = []message.Message{}

	if err := es.Database.InsertUser(userFromDB); err != nil {
		es.Logger.Error("Error inserting user in the database: ", err)
		return c.JSON(http.StatusInternalServerError,
			map[string]string{"result": "fail", "message": err.Error()})
	}

	es.Logger.Info(fmt.Sprintf("Successfully got messages for user: '%s'", username))

	return c.JSON(http.StatusOK, messagesToBeSent)
}

// UpdateMessages with ones yet to be delivered.
func (es *EchoServer) UpdateMessages(c echo.Context) error {

	var incomingUser *tmpUser
	if err := c.Bind(&incomingUser); err != nil {
		es.Logger.Warn("Error binding incoming update message user to tmpUser type", err)

		return c.JSON(http.StatusBadRequest,
			map[string]string{"result": "fail", "message": err.Error()})
	}

	userFromDB, err := es.Database.GetUser(incomingUser.Name)
	if err != nil {
		es.Logger.Error("Error getting user from database: ", err)
		return c.JSON(http.StatusInternalServerError,
			map[string]string{"result": "fail", "message": err.Error()})
	}

	userFromDB.Messages = append(userFromDB.Messages, incomingUser.Messages...)

	if err := es.Database.InsertUser(userFromDB); err != nil {
		es.Logger.Error("Error getting user from database: ", err)
		return c.JSON(http.StatusInternalServerError,
			map[string]string{"result": "fail", "message": err.Error()})
	}

	es.Logger.Info("User messages updated successfully")
	return c.JSON(http.StatusOK,
		map[string]string{"result": "success", "message": "user messages update success"})
}
