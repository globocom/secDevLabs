package main

import (
	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m5/panda_zap/server/app"
	"github.com/globocom/secDevLabs/owasp-top10-2016-mobile/m5/panda_zap/server/config"
	"go.uber.org/fx"
)

func main() {
	fx.New(
		fx.Provide(
			config.NewViper,
			config.NewLogger,
			config.NewDatabase,
			config.NewEchoEngine,
			config.NewEchoServer,
		),
		fx.Invoke(app.Begin),
	).Run()
}
