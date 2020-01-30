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
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
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