.PHONY: client server docker

client:
	cd client && \
	export VITE_API_URL=http://localhost:4000/api && \
	npm install --legacy-peer-deps && \
	npm run dev

server:
	cd server && npm install && npm start

docker:
	docker-compose up --build
