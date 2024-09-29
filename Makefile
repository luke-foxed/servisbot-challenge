.PHONY: client server docker

client:
	cd client && npm install --legacy-peer-deps && npm run dev

server:
	cd server && npm install && npm start

docker:
	docker-compose up --build
