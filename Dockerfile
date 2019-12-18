# Pull the latest node docker image
FROM node:latest

# set the ENV var to production
ENV NODE_ENV=production

# change working dir to /app
WORKDIR /app

# copy specific files to container
COPY client .
COPY controllers .
COPY models .
COPY routes .
COPY server.js .
COPY package.json .

# run the following commands before wrapping up the container
RUN npm install
RUN npm run build

# expose the following ports
EXPOSE 3000
EXPOSE 3001

# when container starts, run this command
CMD ["npm","start"]

