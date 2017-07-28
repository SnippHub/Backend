'use strict';
module.exports = function (sequelize, DataTypes) {
  var GlobalTag = sequelize.define('GlobalTag', {
    text: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  });
  return GlobalTag;
};