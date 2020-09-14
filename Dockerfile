FROM node:erbium

COPY . /app

WORKDIR /app/client
RUN npm install

WORKDIR /app/server
RUN npm install

WORKDIR /app
EXPOSE 3000

WORKDIR /app/client
RUN npm run build

WORKDIR /app/server
CMD ["npm", "start"]