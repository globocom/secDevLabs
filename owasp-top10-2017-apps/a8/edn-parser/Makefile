install:
	lein uberjar
	sudo docker-compose -f deployments/docker-compose.yml --project-directory ${PWD} up edn-parser
