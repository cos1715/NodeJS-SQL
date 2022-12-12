const express = require("express");

const {
  getIndex,
  getProducts,
  getProductDetails,
  getCart,
  postCart,
  deleteCartItem,
  getOrders,
  getCheckout,
} = require("../controllers/shop");

const router = express.Router();

router.get("/", getIndex);
router.get("/products", getProducts);
router.get("/products/:productId", getProductDetails);
router.get("/cart", getCart);
router.post("/cart", postCart);
router.post("/cart-delete-item", deleteCartItem);
router.get("/orders", getOrders);
router.get("/checkout", getCheckout);

module.exports = router;
