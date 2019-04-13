'use strict';
module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: 'Title is Required!'
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: 'Author is Required!'
        }
      }
    },
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {});
  Books.associate = function(models) {
    // associations can be defined here
  };
  return Books;
};