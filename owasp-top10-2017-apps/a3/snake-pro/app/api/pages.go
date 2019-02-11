package api

import (
    "fmt"
	"net/http"
    "os"

    jwt "github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
)

func CheckUserAuth(c echo.Context) (map[string]interface{}, error) {
    cookie, err := ReadCookie(c)
    if err != nil {
        return nil, fmt.Errorf("malformed token: %v", err)
    }

    token, err := jwt.Parse(string(cookie), func(token *jwt.Token) (interface{}, error) {
        // Don't forget to validate the alg is what you expect:
        if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
            return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
        }

        // hmacSampleSecret is a []byte containing your secret, e.g. []byte("my_secret_key")
        return []byte(os.Getenv("SECRET_KEY")), nil
    })

    if token == nil {
        return nil, fmt.Errorf("malformed token: %v", err)
    }

    claims, ok := token.Claims.(jwt.MapClaims)
    if !ok {
        return nil, fmt.Errorf("Missing claims")
    }

    return claims, nil
}

// PageLogin renders login page
func PageLogin(c echo.Context) error {
	return c.Render(http.StatusOK, "form.html", map[string]interface{}{
		"name": "Welcome to SnakePro!",
	})
}

// PageLogin renders login page
func PageHome(c echo.Context) error {
    auth, err := CheckUserAuth(c)
    if err != nil {
        return c.Redirect(302, "/login")
    }

    return c.Render(http.StatusOK, "home.html", map[string]interface{}{
        "name": "Welcome to SnakePro!",
        "user": auth["user"],
    })
}

func PageRanking(c echo.Context) error {
    auth, err := CheckUserAuth(c)
    if err != nil {
        return c.Redirect(302, "/login")
    }

	return c.Render(http.StatusOK, "ranking.html", map[string]interface{}{"user": auth["user"]})
}

//PageGame renders the game page
func PageGame(c echo.Context) error {
    auth, err := CheckUserAuth(c)
    if err != nil {
        return c.Redirect(302, "/login")
    }

	return c.Render(http.StatusOK, "game.html", map[string]interface{}{"user": auth["user"]})
}
