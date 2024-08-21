FROM node:18-alpine
# app directory
WORKDIR /app
# copy the package json file
COPY package*.json ./
# copy the env file in
COPY ./setup/compose-env ./.env

#install deps for backend
RUN npm install --silent --no-optional

#copy backend source
COPY ./server ./server
COPY ./server.js ./server.js

COPY ./client/package*.json ./client
WORKDIR /app/client
RUN npm install --silent --no-optional

# copy and build the react-ui
# so you can cache the ui build if changes are only made to server  
COPY ./client/src ./src
COPY ./client/public ./public
RUN ./node_modules/.bin/react-scripts build


WORKDIR /app


#start the app
CMD ["node", "/app/server.js"]