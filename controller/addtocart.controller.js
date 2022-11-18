const { response } = require("express");
const { cartproductModuel } = require("../models/cartproduct.model");

const getcart = async (req, res) => {
  const user_id = req?.body?.user_id;
  const value = await cartproductModuel.find({ person_id: user_id });
  res.send({ data: value });
};
const addcart = async (req, res) => {
  const user_id = req?.body?.user_id;
  const { product_id, product_details, item_no, size } = req?.body;
  const isdata = await cartproductModuel.findOne({
    product_id,
    person_id: user_id,
  });
  if (isdata) {
    await cartproductModuel.findOneAndUpdate(
      { product_id, person_id: user_id },
      { $inc: { item_no: 1 } }
    );
    try {
      return res.send({ msg: `cart item added successfully${product_id}` });
    } catch (err) {
      return res.status(400).send({ error: err.message });
    }
  } else {
    let newcartdata = await cartproductModuel({
      person_id: user_id,
      product_id,
      product_details,
      item_no,
      size,
    });
    try {
      await newcartdata.save();
      return res.send({ msg: `item added successfully${product_id}` });
    } catch (err) {
      return res.status(400).send({ err: err.message });
    }
  }
  //   const { product_id, product_details, item_no, size } = req.body;
};
const updatecart = async (req, res) => {
  const user_id = req?.body?.user_id;
  const { id } = req.params;
  const { product_id, product_details, item_no, size } = req?.body;
  await cartproductModuel.findOneAndUpdate(
    { person_id: user_id, product_id: id },
    { item_no, size },
    { new: true }
  );
  try {
    return res.send({ msg: `updated successfully :${product_id}` });
  } catch (err) {
    return res.send({ error: err.message });
  }
};
const deletecart = async (req, res) => {
  if (req?.params?.id) {
    const { id } = req?.params;
    const { user_id } = req?.body;

    try {
      await cartproductModuel.findOneAndDelete({
        person_id: user_id,
        product_id: id,
      });
      return res.send({
        msg: "data deleted successfully in the cart what you added recently",
      });
    } catch (err) {
      return res.status(401).send({ error: err.message });
    }
  } else {
    const { user_id } = req?.body;
    try {
      await cartproductModuel.deleteMany({ person_id: user_id });
      // value.then((r) => console.log(r));
      return res.send({ msg: `data deleted ` });
    } catch (err) {
      return res.status(401).send({ error: err.message });
    }
  }
};
const deleteallcart = async (req, res) => {
  // const { id } = req.params;
  return res.send({ deleteall: req.params });
};

const AddtocartController = {
  addcart,
  getcart,
  updatecart,
  deletecart,
  deleteallcart,
};
module.exports = { AddtocartController };
// const { id } = req?.params;
// const { user_id } = req?.body;

// try {
//   await cartproductModuel.findOneAndDelete({
//     person_id: user_id,
//     product_id: id,
//   });
//   res.send({
//     msg: "data deleted successfully in the cart what you added recently",
//   });
// } catch (err) {
//   return res.status(401).send({ error: err.message });
// }
