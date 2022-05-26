# This is a Makefile template!

.SILENT:
.DEFAULT_GOAL := help

#If your app is written in golang, add the following lines to set GOPATH
GO ?= go
GOROOT ?= $(shell $(GO) env GOROOT)
GOPATH ?= $(shell $(GO) env GOPATH)
GOBIN ?= $(GOPATH)/bin

COLOR_RESET = \033[0m
COLOR_COMMAND = \033[36m
COLOR_YELLOW = \033[33m
COLOR_GREEN = \033[32m
COLOR_RED = \033[31m

PROJECT := Golden Hat Society
PORT := 10006
SLEEPUNTILAPPSTARTS := 45

## Installs a development environment using docker-compose
install: compose msg

## Run project using docker-compose
compose: compose-down
	docker-compose -f deployments/docker-compose.yml -p secDevLabs up -d --build --force-recreate

## Down project using docker-compose
compose-down:
	docker-compose -f deployments/docker-compose.yml -p secDevLabs down -v --remove-orphans

## Prints initialization message after compose phase - You can find that the check-init.sh script is also in the docs folder.
msg:
	chmod +x deployments/check-init.sh
	./deployments/check-init.sh

## Prints help message
help:
	printf "\n${COLOR_YELLOW}${PROJECT}\n------\n${COLOR_RESET}"
	awk '/^[a-zA-Z\-\_0-9\.%]+:/ { \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
			helpCommand = substr($$1, 0, index($$1, ":")); \
			helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
			printf "${COLOR_COMMAND}$$ make %s${COLOR_RESET} %s\n", helpCommand, helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST) | sort
	printf "\n"
