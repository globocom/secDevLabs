package api

import (
	"fmt"
	"net/http"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	db "github.com/globocom/secDevLabs/owasp-top10-2017-apps/a3/snake-pro/app/db/mongo"
	"github.com/globocom/secDevLabs/owasp-top10-2017-apps/a3/snake-pro/app/pass"
	"github.com/globocom/secDevLabs/owasp-top10-2017-apps/a3/snake-pro/app/types"
	"github.com/google/uuid"
	"github.com/labstack/echo"
)

// HealthCheck is the heath check function.
func HealthCheck(c echo.Context) error {
	return c.String(http.StatusOK, "WORKING!\n")
}

// WriteCookie writes a cookie into echo Context
func WriteCookie(c echo.Context, jwt string) error {
	cookie := new(http.Cookie)
	cookie.Name = "sessionIDsnake"
	cookie.Value = jwt
	c.SetCookie(cookie)
	return c.String(http.StatusOK, "")
}

// ReadCookie reads a cookie from echo Context.
func ReadCookie(c echo.Context) error {
	cookie, err := c.Cookie("sessionIDsnake")
	if err != nil {
		return err
	}
	fmt.Println(cookie.Name)
	fmt.Println(cookie.Value)
	return c.String(http.StatusOK, "")
}

// Register registers a new user into MongoDB.
func Register(c echo.Context) error {

	userData := types.UserData{}
	err := c.Bind(&userData)
	if err != nil {
		// error binding JSON
		return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Invalid Input."})
	}

	if userData.Password != userData.RepeatPassword {
		return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Passwords do not match."})
	}

	newGUID1 := uuid.Must(uuid.NewRandom())
	userData.UserID = newGUID1.String()

	err = db.RegisterUser(userData)
	if err != nil {
		// could not register this user into MongoDB (or MongoDB err connection)
		return c.JSON(http.StatusInternalServerError, map[string]string{"result": "error", "details": "Error user data2."})
	}

	return c.String(http.StatusOK, "Register: success!\n")
}

// Login checks MongoDB if this user exists and then returns a JWT session cookie.
func Login(c echo.Context) error {

	loginAttempt := types.LoginAttempt{}
	err := c.Bind(&loginAttempt)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Error login."})
	}
	// input validation missing! do it later!

	userDataQuery := map[string]interface{}{"username": loginAttempt.Username}
	userDataResult, err := db.GetUserData(userDataQuery)
	if err != nil {
		// could not find this user in MongoDB (or MongoDB err connection)
		return c.JSON(http.StatusForbidden, map[string]string{"result": "error", "details": "Error login."})
	}

	validPass := pass.CheckPass(userDataResult.Password, loginAttempt.Password)
	if !validPass {
		// wrong password
		return c.JSON(http.StatusForbidden, map[string]string{"result": "error", "details": "Error login."})
	}

	// Create token
	token := jwt.New(jwt.SigningMethodHS256)

	// Set claims
	claims := token.Claims.(jwt.MapClaims)
	claims["name"] = userDataResult.Username
	claims["exp"] = time.Now().Add(time.Hour * 72).Unix()

	// Generate encoded token and send it as response.
	t, err := token.SignedString([]byte("secret"))
	if err != nil {
		return err
	}

	err = WriteCookie(c, t)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Error login5."})
	}

	format := c.QueryParam("format")
	if format == "json" {
		return c.JSON(http.StatusOK, map[string]string{
			"result":   "success",
			"username": userDataResult.Username,
			"user_id":  userDataResult.UserID,
		})
	}

	messageLogon := fmt.Sprintf("Hello, %s! This is your userID: %s\n", userDataResult.Username, userDataResult.UserID)
	return c.String(http.StatusOK, messageLogon)
}
