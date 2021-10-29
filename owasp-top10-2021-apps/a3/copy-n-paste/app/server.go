package main

import (
	"errors"
	"fmt"
	"html/template"
	"io"
	"log"
	"os"
	"time"

	"github.com/globocom/secDevLabs/owasp-top10-2017-apps/a1/copy-n-paste/app/handlers"
	"github.com/globocom/secDevLabs/owasp-top10-2017-apps/a1/copy-n-paste/app/util"

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

	err := loadViper()
	if err != nil {
		log.Fatal(err)
	}

	if err := checkAPIrequirements(); err != nil {
		fmt.Println("[x] Error starting API:")
		fmt.Println("[x]", err)
		os.Exit(1)
	}

	echoInstance := echo.New()
	echoInstance.HideBanner = true

	// Instantiate a template registry with an array of template set
	// Ref: https://medium.freecodecamp.org/how-to-setup-a-nested-html-template-in-the-go-echo-web-framework-670f16244bb4
	templates := make(map[string]*template.Template)
	templates["form.html"] = template.Must(template.ParseFiles("views/form.html", "views/base.html"))
	echoInstance.Renderer = &TemplateRegistry{
		templates: templates,
	}

	echoInstance.Use(middleware.Logger())
	echoInstance.Use(middleware.Recover())
	echoInstance.Use(middleware.RequestID())

	echoInstance.GET("/", handlers.PageLogin)
	echoInstance.POST("/login", handlers.Login)
	echoInstance.POST("/register", handlers.Register)
	echoInstance.GET("/healthcheck", handlers.HealthCheck)

	echoInstance.Logger.Fatal(echoInstance.Start(":10001"))
}

func checkAPIrequirements() error {

	if err := checkEnvVars(); err != nil {
		return err
	}
	fmt.Println("[*] Environment Variables: OK!")

	if err := initDB(); err != nil {
		return err
	}
	fmt.Println("[*] MySQL: Init DB OK!")

	return nil
}

func loadViper() error {
	viper.SetConfigName("config")
	viper.AddConfigPath(".")
	err := viper.ReadInConfig()
	return err
}

func initDB() error {

	timeout := time.After(1 * time.Minute)
	retryTick := time.Tick(15 * time.Second)

	fmt.Println("[*] Initiating DB...")

	for {
		select {
		case <-timeout:
			return errors.New("Error InitDB: timed out")
		case <-retryTick:
			err := util.InitDatabase()
			if err != nil {
				fmt.Println("Error InitDB: not ready yet")
			} else {
				return nil
			}
		}
	}
}

func checkEnvVars() error {

	var envIsSet bool
	var allEnvIsSet bool
	var errorString string

	envVars := []string{
		"MYSQL_USER",
		"MYSQL_PASSWORD",
		"MYSQL_DATABASE",
	}

	env := make(map[string]string)
	allEnvIsSet = true
	for i := 0; i < len(envVars); i++ {
		env[envVars[i]], envIsSet = os.LookupEnv(envVars[i])
		if !envIsSet {
			errorString = errorString + envVars[i] + " "
			allEnvIsSet = false
		}
	}
	if allEnvIsSet == false {
		finalError := fmt.Sprintf("check environment variables: %s", errorString)
		return errors.New(finalError)
	}
	return nil
}
