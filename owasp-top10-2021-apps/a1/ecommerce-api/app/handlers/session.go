package handlers

import (
	"fmt"
	"net/http"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/globocom/secDevLabs/owasp-top10-2017-apps/a5/ecommerce-api/app/db"
	"github.com/globocom/secDevLabs/owasp-top10-2017-apps/a5/ecommerce-api/app/pass"
	"github.com/globocom/secDevLabs/owasp-top10-2017-apps/a5/ecommerce-api/app/types"
	"github.com/google/uuid"
	"github.com/labstack/echo"
)

// WriteCookie writes a cookie into echo Context
func WriteCookie(c echo.Context, jwt string) error {
	cookie := new(http.Cookie)
	cookie.Name = "sessionIDa5"
	cookie.Value = jwt
	c.SetCookie(cookie)
	return c.String(http.StatusOK, "")
}

// ReadCookie reads a cookie from echo Context.
func ReadCookie(c echo.Context) error {
	cookie, err := c.Cookie("sessionIDa5")
	if err != nil {
		return err
	}
	fmt.Println(cookie.Name)
	fmt.Println(cookie.Value)
	return c.String(http.StatusOK, "")
}

// Login checks MongoDB if this user exists and then returns a JWT session cookie.
func Login(c echo.Context) error {

	loginAttempt := types.LoginAttempt{}
	err := c.Bind(&loginAttempt)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Error login1."})
	}
	// input validation missing!

	userDataQuery := map[string]interface{}{"username": loginAttempt.Username}
	userDataResult, err := db.GetUserData(userDataQuery)
	if err != nil {
		// could not find this user in MongoDB (or MongoDB err connection)
		return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Error login3."})
	}

	passOK := pass.CheckPasswordHash(loginAttempt.Password, userDataResult.HashedPassword)
	if err != nil {
		// could not bcrypt this password
		return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Error login2."})
	}

	if !passOK {
		// wrong password
		return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Error login4."})
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

// RegisterUser registers a new user into MongoDB.
func RegisterUser(c echo.Context) error {

	userData := types.UserData{}
	err := c.Bind(&userData)
	if err != nil {
		// error binding JSON
		return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": "Error user data1."})
	}
	// input validation missing!

	newGUID1 := uuid.Must(uuid.NewRandom())
	userData.UserID = newGUID1.String()

	newGUID2 := uuid.Must(uuid.NewRandom())
	userData.Ticket = fmt.Sprintf("%s-%s", userData.Username, newGUID2)

	err = db.RegisterUser(userData)
	if err != nil {
		// could not register this user into MongoDB (or MongoDB err connection)
		errorString := fmt.Sprintf("%s", err)
		return c.JSON(http.StatusBadRequest, map[string]string{"result": "error", "details": errorString})

	}

	return c.String(http.StatusCreated, "Register: success!\n")
}
