# correct one ??
FROM node:erbium

# Copy the current directory contents into the container at /server
COPY . /server/

# Set the working directory to /server
WORKDIR /server

# install dependencies
RUN npm install

# Make port 80 available to the world outside this container (or should it be 5000 ??)
EXPOSE 5000

# Run the app when the container launches
CMD ["npm", "start"]
