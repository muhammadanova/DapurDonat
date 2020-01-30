'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 11;
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class User extends Model {}

  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    username: {
      type: DataTypes.STRING,
      // validate:{
      //   notEmpty: {
      //     args: true,
      //     msg: "please fill the username"
      //   },
      //   len: {
      //     args: [7,25],
      //     msg: "username length 8 - 24"
      //   } 
      // }
    },
    password: {
      type: DataTypes.STRING,
      // validate:{
      //   notEmpty: {
      //     args: true,
      //     msg: "please fill the password"
      //   }
      // }
    },
    email: {
      type : DataTypes.STRING,
      // validate: {
      //   isEmail : {
      //     args: true,
      //     msg: "must use email format. ex:donut@gmail.com"
      //   }
      // }
    },
    role: DataTypes.STRING,
    isactive: DataTypes.INTEGER
  },
  {
    hooks: {
      beforeCreate:(user, options) => {
        user.password = bcrypt.genSaltSync(saltRounds);
      }
    },
    sequelize
  })

  User.associate = function(models) {
    User.belongsToMany(models.Product, { through : 'Cart' })
  };
  return User;
};