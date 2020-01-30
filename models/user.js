'use strict';
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
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      validate: {
        isEmail : true
      }
    },
    role: DataTypes.STRING,
    isactive: DataTypes.INTEGER
  },
  {
    sequelize,
    hooks: {}
  })

  User.associate = function(models) {
    User.belongsToMany(models.Product, { through : 'Cart' })
  };
  return User;
};