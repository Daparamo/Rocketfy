const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePagination = require("mongoose-paginate-v2");

const productSchema = new Schema({
  _id:{type:String,default:ObjectId().toString()},
  name: String,
  description: String,
  sku: String,
  image: [],
  tags: [],
  price: Number,
  discount: Number,
  stock: Number,
  fechaCreacion:{type:Date,default:Date.now},
  fechaModificacion:{type:Date,default:Date.now}
});
productSchema.plugin(mongoosePagination);

module.exports = mongoose.model("product", productSchema);
