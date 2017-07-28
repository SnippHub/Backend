'use strict';
module.exports = function (sequelize, DataTypes) {
  var Snippet = sequelize.define('Snippet', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    visible: DataTypes.BOOLEAN,
    deprecated: DataTypes.BOOLEAN,
    deprecationText: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  });
  return Snippet;
};