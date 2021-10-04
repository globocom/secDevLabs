package handlers

import (
	"fmt"
	"net/http"

	"camp-lake-api/crypto"
	"camp-lake-api/db"
	"camp-lake-api/types"

	"github.com/google/uuid"
	"github.com/labstack/echo"
)

func HealthCheck(c echo.Context) error {
	return c.String(http.StatusOK, "WORKING\n")
}

func WriteCookie(c echo.Context, jwt string) error {
	cookie := new(http.Cookie)
	cookie.Name = "sessionIDa5"
	cookie.Value = jwt
	c.SetCookie(cookie)
	return c.String(http.StatusOK, "")
}

func ReadCookie(c echo.Context) error {
	cookie, err := c.Cookie("sessionIDa5")
	if err != nil {
		return err
	}
	fmt.Println(cookie.Name)
	fmt.Println(cookie.Value)
	return c.String(http.StatusOK, "")
}

func NewUser(c echo.Context) error {
	userData := types.UserData{}
	err := c.Bind(&userData)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Error user data1."})
	}

	newGUID := uuid.Must(uuid.NewRandom())
	userData.UserID = newGUID.String()

	err = db.RegisterUser(userData)
	if err != nil {
		errorString := fmt.Sprintf("%s", err)
		return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": errorString})

	}

	return c.String(http.StatusCreated, "Register: success!\n")
}

func Login(c echo.Context) error {
	loginAttempt := types.LoginAttempt{}
	err := c.Bind(&loginAttempt)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Error login1."})
	}

	userDataQuery := map[string]interface{}{"username": loginAttempt.Username}
	userDataResult, err := db.GetUserData(userDataQuery)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Error login3."})
	}

	passOK := crypto.CheckPasswordHash(loginAttempt.Password, userDataResult.HashedPassword)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Error login2."})
	}

	if !passOK {
		return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Error login4."})
	}

	creds := types.Credentials{
		Username: userDataResult.Username,
	}
	// Create token
	token, err := CreateToken(creds)
	if err != nil {
		return err
	}

	err = WriteCookie(c, token)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Error login5."})
	}

	messageLogon := fmt.Sprintf("Hello, %s! This is your token: %s\n", userDataResult.Username, token)
	return c.String(http.StatusOK, messageLogon)
}

func NewPost(c echo.Context) error {
	var td *types.Post
	if err := c.Bind(&td); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, "invalid json")
	}

	info, err := TokenValid(c.Request())
	if err != nil || info.Username == "" {
		return c.JSON(http.StatusUnauthorized, "unautorized")
	}

	messageSystem := fmt.Sprintf("New post created successfully!\nCreated by: %s!", info.Username)
	return c.JSON(http.StatusOK, messageSystem)
}
