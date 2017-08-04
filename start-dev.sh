#!/bin/bash
./node_modules/.bin/sequelize db:migrate
./node_modules/.bin/nodemon --inspect=0.0.0.0 ./bin/www