package routes

import (
	"fmt"
	"net/http"

	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m5/panda_zap/server/message"
	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m5/panda_zap/server/user"
	"github.com/labstack/echo"
)

type tmpUser struct {
	Name     string             `bson:"name" json:"name"`
	Messages *[]message.Message `bson:"messages" json:"messages"`
}

// RegisterUser attempts to register a new user into the database.
func (es *EchoServer) RegisterUser(c echo.Context) error {

	incomingUser := user.New()
	originalID := incomingUser.ID
	if err := c.Bind(&incomingUser); err != nil {
		es.Logger.Warn("Error binding incoming user to User type", err)

		return c.JSON(http.StatusBadRequest,
			map[string]string{"result": "fail", "message": err.Error()})
	}

	incomingUser.ID = originalID
	if _, err := es.Database.GetUser(incomingUser.Name); err == nil {
		es.Logger.Info("Incoming user already present in the database")

		return c.JSON(http.StatusConflict,
			map[string]string{"result": "fail", "message": err.Error()})
	}

	if err := es.Database.InsertUser(incomingUser); err != nil {
		es.Logger.Warn("Error inserting new user into the database: ", err)

		return c.JSON(http.StatusInternalServerError,
			map[string]string{"result": "fail", "message": err.Error()})
	}

	return c.JSON(http.StatusCreated,
		map[string]string{"result": "success", "message": fmt.Sprintf("User '%s' registered", incomingUser.Name)})
}

// GetUser returns an user from the database if present.
func (es *EchoServer) GetUser(c echo.Context) error {

	username := c.Param("name")

	userFromDB, err := es.Database.GetUser(username)
	if err != nil {
		es.Logger.Info("User not found in the database")

		return c.JSON(http.StatusNotFound,
			map[string]string{"result": "fail", "message": err.Error()})
	}

	es.Logger.Info("User found in the database")
	return c.JSON(http.StatusOK, userFromDB)
}
