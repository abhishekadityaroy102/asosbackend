const { response } = require("express");
const { wishlistproductModuel } = require("../models/wishlistproduct.model");

const getwishlist = async (req, res) => {
  const user_id = req?.body?.user_id;
  const value = await wishlistproductModuel.find({ person_id: user_id });
  res.send({ data: value });
};
const addwishlist = async (req, res) => {
  const user_id = req?.body?.user_id;
  const { product_id, product_details, item_no, size } = req?.body;
  const isdata = await wishlistproductModuel.findOne({
    product_id,
    person_id: user_id,
  });
  if (isdata) {
    await wishlistproductModuel.findOneAndUpdate(
      { product_id, person_id: user_id },
      { $inc: { item_no: 1 } }
    );
    try {
      return res.send({ msg: `cart item added successfully${product_id}` });
    } catch (err) {
      return res.status(400).send({ error: err.message });
    }
  } else {
    let newcartdata = await wishlistproductModuel({
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
const updatewishlist = async (req, res) => {
  const user_id = req?.body?.user_id;
  const { id } = req.params;
  const { product_id, product_details, item_no, size } = req?.body;
  await wishlistproductModuel.findOneAndUpdate(
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
const deletewishlist = async (req, res) => {
  const { id } = req.params;
  const { user_id } = req?.body;
  try {
    await wishlistproductModuel.findOneAndDelete({
      person_id: user_id,
      product_id: id,
    });
    // value.then((r) => console.log(r));
    return res.send({ msg: `data deleted ` });
  } catch (err) {
    return res.status(401).send({ error: err.message });
  }
};

const WishlistController = {
  addwishlist,
  getwishlist,
  updatewishlist,
  deletewishlist,
};
module.exports = { WishlistController };
