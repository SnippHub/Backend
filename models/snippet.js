'use strict';
module.exports = function (sequelize, DataTypes) {
  const Snippet = sequelize.define('snippet', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    visible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    deprecated: DataTypes.BOOLEAN,
    deprecationText: DataTypes.STRING
  });

  Snippet.associate = function (models) {
    Snippet.tags = Snippet.hasMany(models.tag, {
      foreignKey: {
        allowNull: false
      }
    });

    Snippet.files = Snippet.hasMany(models.file, {
      foreignKey: {
        allowNull: false
      }
    });

    Snippet.creator = Snippet.belongsTo(models.user, {
      as: 'creator',
      foreignKey: {
        name: 'creatorId',
        allowNull: false
      }
    });
  };

  return Snippet;
};