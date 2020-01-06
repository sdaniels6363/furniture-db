# Pull the latest node docker image
FROM node:latest

# set the ENV var to production
ENV NODE_ENV=production
ENV MONGODB_URI="mongodb://mongoCC/furniture"

# change working dir to /app
WORKDIR /app

# copy all files to  container
COPY client client
COPY controllers controllers
COPY models models
COPY routes routes
COPY package.json package.json
COPY server.js server.js
COPY node_modules node_modules
COPY .env .env


# expose the following ports
EXPOSE 3000
EXPOSE 3001

# when container starts, run this command
CMD ["npm","start"]

