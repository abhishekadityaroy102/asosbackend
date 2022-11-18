const mongoose = require("mongoose");
const wishlistproductSchema = mongoose.Schema({
  person_id: { type: String, required: true },
  product_id: { type: String },
  product_details: {
    product_img: String,
    product_price: String,
    product_name: String,
    product_color: String,
  },
  item_no: { type: Number, required: true },
  size: { type: String },
});
const wishlistproductModuel = mongoose.model(
  "wishlistproduct",
  wishlistproductSchema
);
module.exports = { wishlistproductModuel };
