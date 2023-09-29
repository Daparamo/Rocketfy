const Product = require("../models/product");

module.exports = {
  getProducts: async (req, res, next) => {
    try {      
      const limit = parseInt(req.params.limit, 10) || 5;
      const page = parseInt(req.params.page, 10) || 1;
      const products = await Product.paginate({}, { limit, page });
      //throw new Error('loool')
      res.status(200).json(products);
    } catch (e) {
      res.status(400);
      
    }
  },
  createProduct: async (req, res, next) => {
    try {
      console.log("Create Product");
      let newProduct = new Product(req.body);
      
      let product = await newProduct.save();
      _id = product._id.toString();
      res.status(200).json(product);
    } catch (e) {
      res.status(400);
    }
  },
  updateProduct: async (req, res, next) => {
    try {
      console.log("Update Product");
      let updateProduct = new Product(req.body);
      let { id } = req.params;
      let filter = { _id: id };
      let response = await Product.findOneAndUpdate(filter, updateProduct);
      res.status(200).json(response);
    } catch (e) {
      res.status(400);
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      let { id } = req.params;
      let filter = { _id: id };
      let response = await Product.deleteOne(filter);      
      res.status(200).json(response);
    } catch (e) {
      res.status(400);
    }
  },
};
