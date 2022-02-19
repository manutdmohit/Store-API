const mongoose = require('mongoose');

require('dotenv').config();

// Load Models
const Product = require('./models/product');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Products.json
const products = require('./products.json');

// Import into DBv
const importData = async () => {
  try {
    await Product.create(products);

    console.log('Data Imported...');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Product.deleteMany();

    console.log('Data Destroyed...');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
