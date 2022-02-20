const Product = require('../models/product');

exports.getAllProductsStatic = async (req, res) => {
  // const search = 'ai';

  const products = await Product.find({
    // name: { $regex: search, $options: 'i' },
  }).sort('-price name');

  res.status(200).json({ count: products.length, products });
};

exports.getAllProducts = async (req, res) => {
  const { featured, company, name } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }

  console.log(queryObject);

  const products = await Product.find(queryObject).sort();
  res.status(200).json({ count: products.length, products });
};
