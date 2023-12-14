var mongoose = require("mongoose");
const Joi = require("joi");

var productSchema = mongoose.Schema({
  title: String,
  price: Number,
  color: String,
  Description: String,
});
var Product = mongoose.model("Product", productSchema);

function validateProduct(data) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(20),
    price: Joi.number().min(4),
    color: Joi.string().min(3).max(10),
    Description: Joi.string().min(10).max(200),
  });
  return schema.validate(data);
}
module.exports.Product = Product;
module.exports.validate = validateProduct;
