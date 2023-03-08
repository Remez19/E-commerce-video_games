FROM node:16.15.0

WORKDIR /clientApp

COPY package.json /clientApp/

RUN npm install 

COPY . /clientApp/

EXPOSE 3000

CMD ["npm", "start"]
