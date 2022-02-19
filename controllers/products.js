const Product = require('../models/product');

exports.getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ company: 'ikea' });

  res.status(200).json({ count: products.length, products });
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.find(req.query);
  res.status(200).json({ count: products.length, products });
};
