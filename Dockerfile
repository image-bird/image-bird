FROM node:latest

WORKDIR /usr/src/app

COPY . .

RUN npm install -g typescript

RUN npm install --include=optional sharp

RUN npm install

RUN npm run build

CMD [ "node", "dist/main.js" ]
