const express = require("express");
let router = express.Router();
var { Product } = require("../../models/product");
const validateProduct = require("../../middlewares/validateProduct");

router.get("/", async (req, res) => {
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  let products = await Product.find().skip(skipRecords).limit(perPage);
  return res.send(products);
});


router.get("/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product)
      return res.status(400).send("Product With this ID is not present"); 
    return res.send(product);
  } catch (err) {
    return res.status(400).send("Id is not correct"); 
  }
});


router.put("/:id", validateProduct, async (req, res) => {
  let product = await Product.findById(req.params.id);
  product.title = req.body.title;
  product.price = req.body.price;
  product.color = req.body.color;
  product.Description = req.body.Description;
  await product.save();
  return res.send(product);
});


router.delete("/:id", async (req, res) => {
  let product = await Product.findByIdAndDelete(req.params.id);
  return res.send(product);
});


router.post("/", validateProduct, async (req, res) => {
  let product = new Product();
  product.title = req.body.title;
  product.price = req.body.price;
  product.color = req.body.color;
  product.Description = req.body.Description;
  await product.save();
  return res.send(product);
});


module.exports = router;
