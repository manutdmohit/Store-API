exports.getAllProductsStatic = async (req, res) => {
  res.status(200).json({ message: 'products testing route' });
};

exports.getAllProducts = async (req, res) => {
  res.status(200).json({ message: 'productsroute' });
};
