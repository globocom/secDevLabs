package main

import (
	"errors"
	"fmt"
	"html/template"
	"io"
	"os"

	apiContext "github.com/globocom/secDevLabs/owasp-top10-2017-apps/a5/ecommerce-api/app/context"
	"github.com/globocom/secDevLabs/owasp-top10-2017-apps/a5/ecommerce-api/app/db"
	"github.com/globocom/secDevLabs/owasp-top10-2017-apps/a5/ecommerce-api/app/handlers"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
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

	configAPI := apiContext.GetAPIConfig()

	if err := checkRequirements(configAPI); err != nil {
		fmt.Printf("Error: %v\n", err)
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

	echoInstance.GET("/", handlers.FormPage)
	echoInstance.GET("/healthcheck", handlers.HealthCheck)
	echoInstance.GET("/ticket/:id", handlers.GetTicket)
	echoInstance.POST("/register", handlers.RegisterUser)
	echoInstance.POST("/login", handlers.Login)

	APIport := fmt.Sprintf(":%d", configAPI.APIPort)
	echoInstance.Logger.Fatal(echoInstance.Start(APIport))

}

func checkRequirements(configAPI *apiContext.APIConfig) error {

	// check if all environment variables are properly set.
	if err := checkEnvVars(); err != nil {
		return err
	}

	// check if MongoDB is accessible and credentials received are working.
	if err := checkMongoDB(); err != nil {
		return err
	}

	return nil
}

func checkEnvVars() error {

	envVars := []string{
		"MONGO_HOST",
		"MONGO_DATABASE_NAME",
		"MONGO_DATABASE_USERNAME",
		"MONGO_DATABASE_PASSWORD",
	}

	var envIsSet bool
	var allEnvIsSet bool
	var errorString string

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

func checkMongoDB() error {

	_, err := db.Connect()

	if err != nil {
		mongoError := fmt.Sprintf("check mongoDB: %s", err)
		return errors.New(mongoError)
	}

	return nil
}
