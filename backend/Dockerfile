FROM node:14.4.0-alpine3.10

WORKDIR /usr/kid

COPY package*.json/
RUN npm install

COPY . .

EXPOSE 3001

CMD ["node","./bin/www"]