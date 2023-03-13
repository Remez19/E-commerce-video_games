FROM node:alpine

WORKDIR /clientApp

COPY package.json /clientApp/

RUN npm install 

COPY . /clientApp/

EXPOSE 3000

CMD ["npm", "start"]

