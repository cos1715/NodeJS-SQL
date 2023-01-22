import { Router } from "express";
import {
  getIndex,
  getProducts,
  getProductDetails,
  getCart,
  postCart,
  deleteCartItem,
  getOrders,
  getCheckout,
} from "../controllers/shop";

const router = Router();

router.get("/", getIndex);
router.get("/products", getProducts);
router.get("/products/:productId", getProductDetails);
router.get("/cart", getCart);
router.post("/cart", postCart);
router.post("/cart-delete-item", deleteCartItem);
router.get("/orders", getOrders);
router.get("/checkout", getCheckout);

export default router;
