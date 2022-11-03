package main

import (
	"errors"
	"html/template"
	"io"
	"os"

	"github.com/fguisso/doryl-site-check/api"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

// TemplateRegistry defines the template registry struct.
type TemplateRegistry struct {
	templates map[string]*template.Template
}

// Render implement e.Renderer interface.
func (t *TemplateRegistry) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	tmpl, ok := t.templates[name]
	if !ok {
		err := errors.New("This template is not found: " + name)
		return err
	}
	return tmpl.ExecuteTemplate(w, "base.html", data)
}

func main() {
	e := echo.New()
	e.HideBanner = true

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.RequestID())

	templates := make(map[string]*template.Template)
	templates["index.html"] = template.Must(template.ParseFiles("templates/home.html", "templates/base.html"))
	templates["check.html"] = template.Must(template.ParseFiles("templates/check.html", "templates/base.html"))

	e.Renderer = &TemplateRegistry{
		templates: templates,
	}
	e.GET("/", api.Index)
	e.POST("/check", api.SiteCheckPage)

	e.Logger.Fatal(e.Start("0.0.0.0:" + os.Getenv("PORT")))
}
