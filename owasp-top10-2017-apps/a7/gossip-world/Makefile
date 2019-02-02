.SILENT:
.DEFAULT_GOAL := help

COLOR_RESET = \033[0m
COLOR_COMMAND = \033[36m
COLOR_YELLOW = \033[33m
COLOR_GREEN = \033[32m
COLOR_RED = \033[31m

PROJECT := A7 Gossip World
PORT := 3001
SLEEPUNTILAPPSTARTS := 45

## Installs a development environment using docker-compose
install: compose msg 

## Runs project using docker-compose
compose:
	docker-compose -f deployments/docker-compose.yml down -v --remove-orphans
	docker-compose -f deployments/docker-compose.yml up -d --build --force-recreate

## Deploys project and view docker logs
deploy: compose
	docker logs app-a7 -f

msg:
	printf "${COLOR_YELLOW}SecDevLabs: 👀  Your app is still starting...\n${COLOR_RESET}"
	sleep ${SLEEPUNTILAPPSTARTS}
	printf "${COLOR_GREEN}SecDevLabs: ☕️  Hmmm... Sounds good!\n"
	printf "SecDevLabs: 🔥  ${PROJECT} may be running at ${COLOR_RESET}${COLOR_RED}http://127.0.0.1:${PORT}${COLOR_RESET}\n"

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
