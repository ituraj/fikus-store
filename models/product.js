const fs = require('fs');
const path = require('path');
const rootDirectory = require('../utils/path');

const productsPath = path.join(rootDirectory, 'data', 'products.json');

const getProductsFromFile = callback => {
  fs.readFile(productsPath, (error, fileContent) => {
    if (error) {
      return callback([]);
    }
    // To turn JSON back to an array we need to call JSON.parse
    callback(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(productsPath, JSON.stringify(products), error => {
        console.log(error);
      });
    });
  }

  // use static to call fetch directly on class Product
  static fetchAll(callback) {
    getProductsFromFile(callback);
  }
};
