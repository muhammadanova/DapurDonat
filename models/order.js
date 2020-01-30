'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Order extends Model {}

  Order.init({
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      products_name: DataTypes.STRING,
      quantities: DataTypes.INTEGER,
      total_price: DataTypes.INTEGER,
      address: {
        type : DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Address harus di input'
          }
        }
      }
    },
  {
    sequelize
  })
  
  Order.associate = function(models) {};
  return Order;
};