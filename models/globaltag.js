'use strict';
module.exports = function (sequelize, DataTypes) {
  const GlobalTag = sequelize.define('globalTag', {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });

  GlobalTag.associate = function (models) {

  };

  return GlobalTag;
};