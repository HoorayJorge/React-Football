FROM node:16.17.1-slim

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN yarn install

RUN yarn build

EXPOSE 3000

CMD ["yarn","start"]