'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Product extends Model {}

  Product.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      validation: {
        notEmpty: {
          args: true,
          msg: `please fill the product name`
        },
      }
    },
    price:{
      type: DataTypes.INTEGER,
      validation: {
        notEmpty: {
          args: true,
          msg: `please fill the product name`
        },
        min: {
          args: 1,
          msg: `min price is 1`
        }
      }
    },
    rating: DataTypes.INTEGER,
    desc: DataTypes.STRING,
    images_product: DataTypes.STRING
  },
  {
    sequelize,
    hooks: {}
  })

  Product.associate = function(models) {
    Product.belongsToMany(models.User, { through : 'Cart' })
  };
  return Product;
};