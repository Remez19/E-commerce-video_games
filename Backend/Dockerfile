FROM node:16.15.0

WORKDIR /serverApp

COPY package.json /serverApp/

RUN npm install 

COPY . /serverApp/

EXPOSE 8080

CMD ["node", "app.js"]