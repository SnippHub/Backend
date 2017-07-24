FROM node:alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "npm-shrinkwrap.json*", "package-lock.json*" "./"]
RUN npm install
COPY . .
EXPOSE 3000 9229
CMD npm start