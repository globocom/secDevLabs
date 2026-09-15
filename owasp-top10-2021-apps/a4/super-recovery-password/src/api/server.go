package main

import (
	"api/database"
	"api/routes"
	"api/services"
	"errors"
	"fmt"
	"net/http"
	"os"
	"time"
	"sync"


	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {
	if err := checkAPIrequirements(); err != nil {
		fmt.Println("[x] Error starting API:")
		fmt.Println("[x]", err)
		os.Exit(1)
	}

	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:40001"},
		AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete, http.MethodOptions},
	}))

	e.GET("/healthcheck", routes.Healthcheck)
	e.POST("/register", routes.Register, newRateLimiter(5, time.Minute))
	e.POST("/login", routes.Login, newRateLimiter(5, time.Minute))
	e.POST("/recovery", routes.RecoveryPassword, newRateLimiter(5, time.Minute))

	r := e.Group("/reset")
	config := middleware.JWTConfig{
		Claims:     &services.JwtCustomClaims{},
		SigningKey: []byte(os.Getenv("JWT_SECRET")),
	}

	r.Use(middleware.JWTWithConfig(config))

	r.POST("", routes.ChangePassword)

	e.Logger.Fatal(e.Start(":3000"))
}


func newRateLimiter(maxRequests int, window time.Duration) echo.MiddlewareFunc {
	var mu sync.Mutex
	hits := make(map[string][]time.Time)

	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			ip := c.RealIP()
			now := time.Now()

			mu.Lock()
			defer mu.Unlock()

			var recent []time.Time
			for _, t := range hits[ip] {
				if now.Sub(t) < window {
					recent = append(recent, t)
				}
			}
			if len(recent) >= maxRequests {
				return c.JSON(http.StatusTooManyRequests, echo.Map{
					"message": "too many requests, try again later",
				})
			}
			hits[ip] = append(recent, now)

			return next(c)
		}
	}
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

func checkEnvVars() error {

	var envIsSet bool
	var allEnvIsSet bool
	var errorString string

	envVars := []string{
		"MYSQL_USER",
		"MYSQL_PASSWORD",
		"MYSQL_DATABASE",
		"JWT_SECRET",
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

func initDB() error {

	timeout := time.After(1 * time.Minute)
	retryTick := time.Tick(15 * time.Second)

	fmt.Println("[*] Initiating DB...")

	for {
		select {
		case <-timeout:
			return errors.New("Error InitDB: timed out")
		case <-retryTick:
			err := database.InitDatabase()
			if err != nil {
				fmt.Println("Error InitDB: not ready yet")
			} else {
				return nil
			}
		}
	}
}
