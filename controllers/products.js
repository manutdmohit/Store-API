const Product = require('../models/product');

exports.getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ company: 'ikea' });

  res.status(200).json({ count: products.length, products });
};

exports.getAllProducts = async (req, res) => {
  const { featured, company } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  const products = await Product.find(queryObject);
  res.status(200).json({ count: products.length, products });
};
