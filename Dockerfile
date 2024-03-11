FROM node:18

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . .

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

CMD [ "npm", "run", "start:dev" ]

# FROM node:18

# WORKDIR /usr/src/app

# COPY . .

# RUN npm install

# RUN npm run build

# RUN rm -rf ./src

# EXPOSE 3003

# CMD [ "npm", "run", "start:prod" ]