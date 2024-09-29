.PHONY: client-local server-local run-docker

client-local:
	cd client && npm install --legacy-peer-deps && npm run dev

server-local:
	cd server && npm install && npm start

run-docker:
	docker-compose up --build
