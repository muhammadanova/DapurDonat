'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    slug_product: DataTypes.STRING,
    price: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    desc: DataTypes.STRING,
    img: DataTypes.STRING
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};