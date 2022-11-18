const { womenproductModel } = require("../models/product.model");

const getProduct = async (req, res) => {
  // res.send(req.query);
  var q = req?.query;

  if (q.category || q.brand || q.product_name || q.sort_price) {
    let name;
    let category;
    let brand;
    let sort_price;
    q.sort_price = "asc" ? (sort_price = 1) : (sort_price = -1);
    // q.sort_price;
    q.product_name
      ? (name = { name: { $regex: "^" + q.product_name, $options: "i" } })
      : (name = null);
    q.category
      ? (category = { category: { $regex: "^" + q.category, $options: "i" } })
      : (category = null);

    q.brand
      ? (brand = { brand: { $regex: "^" + q.brand, $options: "i" } })
      : (brand = null);
    // let value = { category };
    let value = [category, brand, name];
    let newvalue = value.filter((el) => el != null);
    console.log(newvalue);

    // console.log(...value);
    let data = await womenproductModel
      .find({ $and: [...newvalue] })
      .sort({ price: sort_price });
    try {
      return res.send({ data: data });
    } catch (err) {
      return res.status(400).send({ error: err.message });
    }
  } else {
    let data = await womenproductModel.find();
    try {
      return res.send({ data: data });
    } catch (err) {
      return res.status(400).send({ error: err.message });
    }
  }
  //   if (req.query.category) {
  //     const results = await womenproductModel.find({
  //       category: { $regex: "^" + req.query.category, $options: "i" },
  //     });

  //     return res.send({ data: results });
  //   }
  //   if (req.query.product_name) {
  //     const results = await womenproductModel.find({
  //       name: { $regex: "^" + req.query.product_name, $options: "i" },
  //     });
  //     return res.send({ data: results });
  //   }
  //   if (req.query.product_id) {
  //     const id = req.query.product_id;
  //     const results = await womenproductModel.findOne({ id });
  //     return res.send({ data: results });
  //   } else {
  //     const results = await womenproductModel.find();
  //     return res.send({ data: results });
  //   }

  //   // const value = await womenproductModel.find({ category });
  //   // res.send(value);
  //   //   res.send("products getting");
};
const getProductDetails = async (req, res) => {
  const category = req?.params?.category;
  const id = req?.params?.id;
  // res.send(params);
  const value = await womenproductModel.findOne({ category, id });
  try {
    return res.send({ data: value });
  } catch (err) {
    return res.send({ msg: "no data" });
  }
};
const getProductCategory = async (req, res) => {
  const { category } = req.params;
  console.log("category", category);
  const value = await womenproductModel.find({ category: category });
  return res.send({ data: value });
};
const addProduct = async (req, res) => {
  res.send("products addded");
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await womenproductModel.findOneAndDelete({ id });
  try {
    return res.send({ msg: "deleted successfully" });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
};
const editProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, category, size, brand, aboutme } = req?.body;
  try {
    await womenproductModel.findOneAndUpdate(
      { id },
      { name, price, category, size, brand, aboutme }
    );
    return res.send({ msg: "updated successfully" });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
};
const WomenProductController = {
  getProduct,
  getProductDetails,
  getProductCategory,
  addProduct,
  deleteProduct,
  editProduct,
};
module.exports = { WomenProductController };
