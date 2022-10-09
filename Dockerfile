FROM node:16.17.1-slim

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN yarn install

ENV HTTPS=true
ENV SSL_CRT_FILE=/usr/src/app/fullchain.pem
ENV SSL_KEY_FILE=/usr/src/app/privkey.pem

EXPOSE 3000

CMD ["yarn", "start"]
