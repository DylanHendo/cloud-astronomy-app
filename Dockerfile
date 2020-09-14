# Install node/npm
FROM node:erbium

# copy all to app directory
COPY . /app

# install dependencies in client directory
WORKDIR /app/client
RUN npm install

# install dependencies in server directory
WORKDIR /app/server
RUN npm install

# expose port 3000
WORKDIR /app
EXPOSE 3000

# build client 
WORKDIR /app/client
RUN npm run build

# run server
WORKDIR /app/server
CMD ["npm", "start"]