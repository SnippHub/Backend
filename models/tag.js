'use strict';
module.exports = function (sequelize, DataTypes) {
    const Tag = sequelize.define('tag', {
        text: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Tag.associate = function (models) {

    };

    return Tag;
};