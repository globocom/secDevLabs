package routes

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m5/panda_zap/server/message"
	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m5/panda_zap/server/user"
	"github.com/labstack/echo"
)

type tmpUser struct {
	Name     string            `bson:"name" json:"name"`
	Messages []message.Message `bson:"messages" json:"messages"`
}

// RegisterUser attempts to register a new user into the database.
func (es *EchoServer) RegisterUser(c echo.Context) error {

	incomingUser := user.New()
	if err := c.Bind(&incomingUser); err != nil {
		es.Logger.Warn("Error binding incoming user to User type", err)

		return c.JSON(http.StatusBadRequest,
			map[string]string{"result": "fail", "message": err.Error()})
	}

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

	token, err := es.Auth.NewToken(incomingUser.ID, incomingUser.Name)
	if err != nil {
		return c.JSON(http.StatusInternalServerError,
			map[string]string{"result": "fail", "message": err.Error()})
	}

	cookie := new(http.Cookie)
	cookie.Name = "session"
	cookie.Value = token

	c.SetCookie(cookie)

	es.Logger.Info(fmt.Sprintf("User '%s' registered", incomingUser.Name))

	return c.JSON(http.StatusCreated,
		map[string]string{"result": "success", "message": fmt.Sprintf("User '%s' registered", incomingUser.Name)})
}

// GetUser returns an user from the database if present.
func (es *EchoServer) GetUser(c echo.Context) error {

	username := c.Param("name")

	userFromDB, err := es.Database.GetUser(username)
	if err != nil {
		es.Logger.Info(fmt.Sprintf("User '%s' not found in the database", username))

		return c.JSON(http.StatusNotFound,
			map[string]string{"result": "fail", "message": err.Error()})
	}

	es.Logger.Info(fmt.Sprintf("User '%s' found in the database", username))
	return c.JSON(http.StatusOK, userFromDB)
}

// removeKey attempts to remove a given user's key from the database.
func (es *EchoServer) removeKey(user *user.User) error {
	user.Key = ""

	if err := es.Database.InsertUser(user); err != nil {
		return err
	}

	es.Logger.Info("User key removed from database")
	return nil
}

// GetUserKeyV2 returns the key of a given user.
func (es *EchoServer) GetUserKeyV2(c echo.Context) error {

	username := c.Param("name")

	userFromDB, err := es.Database.GetUser(username)
	if err != nil {
		es.Logger.Warn(fmt.Sprintf("User '%s' not found in the database", username))

		return c.JSON(http.StatusNotFound,
			map[string]string{"result": "fail", "message": err.Error()})
	}

	keyToBeReturned := userFromDB.Key

	if err := es.removeKey(userFromDB); err != nil {
		es.Logger.Error("Error removing user key from database")
	}

	es.Logger.Info(fmt.Sprintf("User '%s' key found in the database", username))

	return c.JSON(http.StatusOK, keyToBeReturned)
}

// UpdateUserMessages attempts to update messages from a given user.
func (es *EchoServer) UpdateUserMessages(username string, messages []message.Message) error {

	userFromDB, err := es.Database.GetUser(username)
	if err != nil {
		return errors.New("User not present in the database")
	}

	userFromDB.Messages = append(userFromDB.Messages, messages...)

	if err := es.Database.InsertUser(userFromDB); err != nil {
		return errors.New("Error inserting user into the database")
	}

	return nil
}

// UpdateUserKeyV2 attempts to update messages from a given user.
func (es *EchoServer) UpdateUserKeyV2(c echo.Context) error {

	username := es.Auth.GetUser(c)

	userFromDB, err := es.Database.GetUser(username)
	if err != nil {
		return errors.New("User not present in the database")
	}

	var incomingKey keyHolderV2
	if err := c.Bind(&incomingKey); err != nil {
		es.Logger.Warn("Error binding incoming payload to keyHolderV2 type", err)

		return c.JSON(http.StatusBadRequest,
			map[string]string{"result": "fail", "message": err.Error()})
	}

	userFromDB.Key = incomingKey.Value

	if err := es.Database.InsertUser(userFromDB); err != nil {
		return errors.New("Error inserting user into the database")
	}

	es.Logger.Info("User key updated")

	return nil
}
