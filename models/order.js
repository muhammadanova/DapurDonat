'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    products_name: DataTypes.STRING,
    quantities: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};