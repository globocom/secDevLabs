package routes

import (
	"math/rand"
	"net/http"
	"strconv"

	"github.com/labstack/echo"
)

type keyHolderV1 struct {
	Value int `bson:"key" json:"key"`
}

type keyHolderV2 struct {
	Value string `bson:"key" json:"key"`
}

// GetKeyV1 returns the encryption key
func (es *EchoServer) GetKeyV1(c echo.Context) error {

	if es.MessageKey.Value == 0 {
		es.MessageKey.Value = rand.Intn(100) + 1
	}

	return c.JSON(http.StatusOK,
		map[string]string{"key": strconv.Itoa(es.MessageKey.Value)})
}
