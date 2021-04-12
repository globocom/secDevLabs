package main

import (
	"errors"
	"fmt"
	"html/template"
	"io"
	"os"
	"strconv"

	"github.com/globocom/secDevLabs/owasp-top10-2017-apps/a3/snake-pro/app/api"
	"github.com/globocom/secDevLabs/owasp-top10-2017-apps/a3/snake-pro/app/config"
	db "github.com/globocom/secDevLabs/owasp-top10-2017-apps/a3/snake-pro/app/db/mongo"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/spf13/viper"
)

// TemplateRegistry defines the template registry struct
// Ref: https://medium.freecodecamp.org/how-to-setup-a-nested-html-template-in-the-go-echo-web-framework-670f16244bb4
type TemplateRegistry struct {
	templates map[string]*template.Template
}

// Render implement e.Renderer interface
// Ref: https://medium.freecodecamp.org/how-to-setup-a-nested-html-template-in-the-go-echo-web-framework-670f16244bb4
func (t *TemplateRegistry) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	tmpl, ok := t.templates[name]
	if !ok {
		err := errors.New("Template not found -> " + name)
		return err
	}
	return tmpl.ExecuteTemplate(w, "base.html", data)
}

func main() {

	fmt.Println("[*] Starting Snake Pro...")

	// loading viper
	viper.SetConfigName("config")
	viper.AddConfigPath(".")
	if err := viper.ReadInConfig(); err != nil {
		errorAPI(err)
	}
	if err := viper.Unmarshal(&config.APIconfiguration); err != nil {
		errorAPI(err)
	}

	// check if MongoDB is acessible and credentials received are working.
	if _, err := checkMongoDB(); err != nil {
		fmt.Println("[X] ERROR MONGODB: ", err)
		os.Exit(1)
	}

	fmt.Println("[*] MongoDB: OK!")
	fmt.Println("[*] Viper loaded: OK!")

	echoInstance := echo.New()
	echoInstance.HideBanner = true

	echoInstance.Use(middleware.Logger())
	echoInstance.Use(middleware.Recover())
	echoInstance.Use(middleware.RequestID())

	templates := make(map[string]*template.Template)
	templates["form.html"] = template.Must(template.ParseFiles("views/form.html", "views/base.html"))
	templates["game.html"] = template.Must(template.ParseFiles("views/game.html", "views/base.html"))
	templates["ranking.html"] = template.Must(template.ParseFiles("views/ranking.html", "views/base.html"))

	echoInstance.Renderer = &TemplateRegistry{
		templates: templates,
	}
	echoInstance.GET("/healthcheck", api.HealthCheck)
	echoInstance.POST("/register", api.Register)
	echoInstance.POST("/login", api.Login)
	echoInstance.GET("/login", api.PageLogin)
	echoInstance.GET("/", api.Root)
	r := echoInstance.Group("/game")
	config := middleware.JWTConfig{
		TokenLookup: "cookie:sessionIDsnake",
		SigningKey:  []byte(os.Getenv("SECRET_KEY")),
	}
	r.Use(middleware.JWTWithConfig(config))

	r.GET("/play", api.PageGame)
	r.GET("/ranking", api.PageRanking)

	APIport := fmt.Sprintf(":%d", getAPIPort())
	echoInstance.Logger.Fatal(echoInstance.Start(APIport))
}

func errorAPI(err error) {
	fmt.Println("[x] Error starting Snake Pro:")
	fmt.Println("[x]", err)
	os.Exit(1)
}

func getAPIPort() int {
	apiPort, err := strconv.Atoi(os.Getenv("API_PORT"))
	if err != nil {
		apiPort = 10003
	}
	return apiPort
}

func checkMongoDB() (*db.DB, error) {
	return db.Connect()
}
