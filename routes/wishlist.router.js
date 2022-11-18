const { Router } = require("express");
const { WishlistController } = require("../controller/wishlist.controller");

const { authentication } = require("../middleware/authentication.middleware");
const wishlistRotuer = Router();
wishlistRotuer.get("/", authentication, WishlistController.getwishlist);
wishlistRotuer.patch("/:id", authentication, WishlistController.updatewishlist);
wishlistRotuer.post(
  "/addwishlist",
  authentication,
  WishlistController.addwishlist
);
wishlistRotuer.delete(
  "/:id",
  authentication,
  WishlistController.deletewishlist
);
module.exports = { wishlistRotuer };
