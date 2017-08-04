'use strict';
module.exports = function(sequelize, DataTypes) {
  var File = sequelize.define('File', {
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
    order: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return File;
};