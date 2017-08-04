FROM node:8
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "npm-shrinkwrap.json*", "package-lock.json*", "./"]
RUN npm install
COPY . .
RUN chmod +x ./start-prod.sh
EXPOSE 3000 9229
CMD npm start