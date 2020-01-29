'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Product extends Model {}

  Product.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: DataTypes.STRING,
    slug_product: DataTypes.STRING,
    price: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    desc: DataTypes.STRING,
    img: DataTypes.STRING
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