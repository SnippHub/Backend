'use strict';
const bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
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
    setterMethods: {
      password(newPassword) {
        var hashedPw = bcrypt.hashSync(newPassword, 10);

        this.setDataValue('password', hashedPw);
      },
    }
  });

  User.associate = function (models) {

  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  }

  return User;
};