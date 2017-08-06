'use strict';
const bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: DataTypes.STRING,
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
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
    User.snippets = User.hasMany(models.snippet, {
      foreignKey: 'creatorId'
    });
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  }

  return User;
};