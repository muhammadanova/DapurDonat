'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Order extends Model {}

  Order.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    products_name: DataTypes.STRING,
    quantities: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER
  },
  {
    sequelize,
    hooks: {}
  })
  
  Order.associate = function(models) {};
  return Order;
};