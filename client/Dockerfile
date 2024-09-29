FROM node:22-alpine

WORKDIR /app

COPY package.json .

# react-json-view has some peer-deps issues
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 5678

CMD ["npm", "run", "dev_host"]