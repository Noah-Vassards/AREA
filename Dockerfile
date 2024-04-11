FROM node:14

WORKDIR /

COPY package.json ./

RUN npm install

COPY . .

RUN npm install -g expo-cli

ENV NODE_ENV production

EXPOSE 3002

CMD [ "expo", "start" ]