'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

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
      total_price: DataTypes.INTEGER,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    },
  {
    sequelize,
    hooks: {}
  })
  
  Order.associate = function(models) {};
  return Order;
};