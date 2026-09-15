package routes

import (
	"net/http"

	"github.com/labstack/echo"
)

// RecoveryPassword está desativaodo!
//
// O mecanismo anterior, baseado em perguntas de segurança de baixa segurança,
// permitia enumeração de usuários, brute force das respostas e emissão de um
// token de recuperação — levando a account takeover.
//
// Até que um método de recuperação forte e out-of-band seja implementado
// (ex.: token de uso único enviado por e-mail/SMS verificado), este endpoint
// não processa nenhuma tentativa de recuperação e retorna uma resposta neutra,
// idêntica em qualquer situação, para não revelar informação alguma.
func RecoveryPassword(c echo.Context) error {
	return c.JSON(http.StatusServiceUnavailable, echo.Map{
		"message": "password recovery is temporarily unavailable",
	})
}