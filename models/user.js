'use strict';
const bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    isEditor: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    activated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    },
    setterMethods: {
      password(newPassword) {
        var hashedPw = bcrypt.hashSync(newPassword, 10);

        this.setDataValue('password', hashedPw);
      },
    }
  });
  return User;
};