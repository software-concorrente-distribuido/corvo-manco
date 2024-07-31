docker-compose down

docker build -t tavernateste:latest ./tavernateste

docker build -t tavernafrontend:latest ./taverna-fe

docker-compose up --build --force-recreate --remove-orphans