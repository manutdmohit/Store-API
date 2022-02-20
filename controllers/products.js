const Product = require('../models/product');

exports.getAllProductsStatic = async (req, res) => {
  // const search = 'ai';

  // const products = await Product.find({
  //   // name: { $regex: search, $options: 'i' },
  // }).sort('-price name');

  const products = await Product.find({}).select('name price');

  res.status(200).json({ count: products.length, products });
};

exports.getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;
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

  // console.log(queryObject);

  let result = Product.find(queryObject);

  // sort
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

  if (fields) {
    const selectList = fields.split(',').join(' ');
    result = result.select(selectList);
  }

  const products = await result;

  res.status(200).json({ count: products.length, products });
};
