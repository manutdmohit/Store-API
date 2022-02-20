const Product = require('../models/product');

exports.getAllProductsStatic = async (req, res) => {
  // const search = 'ai';

  // const products = await Product.find({
  //   // name: { $regex: search, $options: 'i' },
  // }).sort('-price name');

  // const products = await Product.find({})
  //   .sort('name')
  //   .select('name price')
  //   .limit(4)
  //   .skip(1);

  const products = await Product.find({ price: { $gt: 30 } })
    .sort('price')
    .select('name price');

  res.status(200).json({ count: products.length, products });
};

exports.getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericfilters } = req.query;
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

  if (numericfilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };

    const regEx = /\b(<|>|>=|<|<=)\b/g;

    let filters = numericfilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');

      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  console.log(queryObject);

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

  // Page
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;

  res.status(200).json({ count: products.length, products });
};
