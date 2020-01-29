'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Cart extends Model {}

  Cart.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    ProductId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, 
  {
    sequelize,
    hooks: {}
  })

  Cart.associate = function(models) {};
  return Cart;
};