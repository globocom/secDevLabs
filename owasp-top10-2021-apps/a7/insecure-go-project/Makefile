.SILENT:
.DEFAULT_GOAL := help

GO ?= go
GOROOT ?= $(shell $(GO) env GOROOT)
GOPATH ?= $(shell $(GO) env GOPATH)
GOBIN ?= $(GOPATH)/bin
GODEP ?= $(GOBIN)/dep
GOLINT ?= $(GOBIN)/golint
GOSEC ?= $(GOBIN)/gosec

INSECUREBIN ?= insecureA2

COLOR_RESET = \033[0m
COLOR_COMMAND = \033[36m
COLOR_YELLOW = \033[33m
COLOR_GREEN = \033[32m
COLOR_RED = \033[31m

PROJECT := A2 - Insecure Go Project
PORT := 10002

## Installs a development environment
install: compose msg

## Composes project using docker-compose
compose:
	docker-compose -f deployments/docker-compose.yml down -v --remove-orphans
	docker-compose -f deployments/docker-compose.yml up -d --build --force-recreate

## Prints initialization message after compose phase
msg:
	chmod +x deployments/check-init.sh
	./deployments/check-init.sh

## Gets all go test dependencies
get-deps:
	$(GO) get -u github.com/golang/dep/cmd/dep
	$(GO) get -u golang.org/x/lint/golint
	$(GO) get -u github.com/securego/gosec/cmd/gosec

## Checks depencies of the project
check-deps:
	$(GODEP) ensure -v

## Runs a security static analysis using Gosec
check-sec:
	$(GOSEC) ./... 2> /dev/null

## Perfoms all make tests
test: get-deps lint security-check

## Runs lint
lint:
	$(GOLINT) $(shell $(GO) list ./...)

## Builds Go project to the executable fil
build:
	$(GO) build -o "$(INSECUREBIN)"

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
