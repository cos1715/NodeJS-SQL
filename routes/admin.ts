import express from "express";
import { ADMIN_URL_ROUTES } from "../const";
import {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
} from "../controllers/admin";

const router = express.Router();

// /admin/add-product => GET
router.get(ADMIN_URL_ROUTES.addProduct, getAddProduct);

// /admin/add-product => POST
router.post(ADMIN_URL_ROUTES.addProduct, postAddProduct);

// /admin/products => GET
router.get(ADMIN_URL_ROUTES.products, getProducts);

// /admin/edit-product => GET
router.get(ADMIN_URL_ROUTES.editProductId, getEditProduct);

// /admin/edit-product => POST
router.post(ADMIN_URL_ROUTES.editProduct, postEditProduct);

// /admin/delete-product => DELETE
router.post(ADMIN_URL_ROUTES.deleteProduct, postDeleteProduct);

export default router;
