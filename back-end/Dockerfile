FROM node:12.16.3

WORKDIR /code

ENV WS_PORT 8000

COPY package.json /code/package.json

RUN npm install

COPY . /code

CMD ["node", "server-ws.js"]