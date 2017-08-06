'use strict';
module.exports = function (sequelize, DataTypes) {
  const File = sequelize.define('file', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: DataTypes.TEXT,
    order: DataTypes.INTEGER
  });

  File.associate = function (models) {

  };

  return File;
};