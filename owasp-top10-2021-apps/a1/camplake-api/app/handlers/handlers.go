package handlers

import (
	"fmt"
	"net/http"
	"time"

	"camp-lake-api/context"
	"camp-lake-api/crypto"
	"camp-lake-api/db"
	"camp-lake-api/types"

	"github.com/google/uuid"
	"github.com/labstack/echo"
	log "github.com/sirupsen/logrus"
)

func HealthCheck(c echo.Context) error {
	return c.String(http.StatusOK, "WORKING\n")
}

func WriteCookie(c echo.Context, jwt string) error {
	apiConfig := context.GetAPIConfig()

	cookie := new(http.Cookie)
	cookie.Name = "sessionIDa5"
	cookie.Value = jwt
	cookie.Path = "/"
	cookie.Domain = apiConfig.Domain
	cookie.Expires = time.Now().Add(time.Hour * 24 * 7)
	cookie.HttpOnly = true
	cookie.Secure = !apiConfig.DebugMode
	cookie.SameSite = http.SameSiteStrictMode
	c.SetCookie(cookie)
	return c.String(http.StatusOK, "")
}

func ReadCookie(c echo.Context) error {
	cookie, err := c.Cookie("sessionIDa5")
	if err != nil {
		log.WithFields(
			log.Fields{
				"method": "ReadCookie",
				"error":  err,
			}).Error()
		return err
	}
	fmt.Println(cookie.Name)
	return c.String(http.StatusOK, "")
}

func NewUser(c echo.Context) error {
	userData := types.UserData{}
	err := c.Bind(&userData)
	if err != nil {
		log.WithFields(
			log.Fields{
				"method": "NewUserData",
				"error":  err,
			}).Error()
		return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Error user data."})
	}

	newGUID := uuid.Must(uuid.NewRandom())
	userData.UserID = newGUID.String()

	err = db.RegisterUser(userData)
	if err != nil {
		log.WithFields(
			log.Fields{
				"method": "NewUserRegisterUser",
				"error":  err,
			}).Error()
		return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Error registering user."})
	}

	return c.String(http.StatusCreated, "Register: success!\n")
}

func Login(c echo.Context) error {
	loginAttempt := types.LoginAttempt{}
	err := c.Bind(&loginAttempt)
	if err != nil {
		log.WithFields(
			log.Fields{
				"method": "LoginLoginAttempt",
				"error":  err,
			}).Error()
		return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Incorrect username or password."})
	}

	userDataQuery := map[string]interface{}{"username": loginAttempt.Username}
	userDataResult, err := db.GetUserData(userDataQuery)
	if err != nil {
		log.WithFields(
			log.Fields{
				"method": "LoginUserDataQuery",
				"error":  err,
			}).Error()
		return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Incorrect username or password."})
	}

	passOK := crypto.CheckPasswordHash(loginAttempt.Password, userDataResult.HashedPassword)
	if err != nil {
		log.WithFields(
			log.Fields{
				"method": "LoginCheckPasswordHash",
				"error":  err,
			}).Error()
		return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Incorrect username or password."})
	}

	if !passOK {
		return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Incorrect username or password."})
	}

	creds := types.Credentials{
		Username: userDataResult.Username,
	}
	// Create token
	token, err := CreateToken(creds)
	if err != nil {
		log.WithFields(
			log.Fields{
				"method": "LoginCreateToken",
				"error":  err,
			}).Error()
		return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Error creating token."})
	}

	err = WriteCookie(c, token)
	if err != nil {
		log.WithFields(
			log.Fields{
				"method": "LoginWriteCookie",
				"error":  err,
			}).Error()
		return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Incorrect username or password"})
	}

	messageLogon := fmt.Sprintf("Hello, %s! This is your token: %s\n", userDataResult.Username, token)
	return c.String(http.StatusOK, messageLogon)
}

func NewPost(c echo.Context) error {
	var td *types.Post
	if err := c.Bind(&td); err != nil {
		log.WithFields(
			log.Fields{
				"method": "NewPost",
				"error":  err,
			}).Error()
		return c.JSON(http.StatusUnprocessableEntity, "invalid json")
	}

	info, err := TokenValid(c.Request())
	if err != nil || info.Username == "" {
		return c.JSON(http.StatusUnauthorized, "unautorized")
	}

	messageSystem := fmt.Sprintf("New post created successfully!\nCreated by: %s!", info.Username)
	return c.JSON(http.StatusOK, messageSystem)
}
