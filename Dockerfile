# Pull the latest node docker image
FROM node:latest

# set the ENV var to production
ENV NODE_ENV=production
ENV MONGODB_URI="mongodb://mongoCC/furniture"

# change working dir to /app
WORKDIR /app

# copy all files to  container
COPY client/ .
COPY controllers/ .
COPY models/ .
COPY routes/ .
COPY package.json .
COPY server.js .

# install dependencies
RUN npm install

# run the following commands before wrapping up the container
RUN npm run build

# expose the following ports
EXPOSE 3000
EXPOSE 3001

# when container starts, run this command
CMD ["npm","start"]

