const URL_ROUTES = {};
const ADMIN_URL_ROUTES = {
  addProduct: "/add-product",
  products: "/products",
  editProduct: "/edit-product",
  editProductId: "/edit-product/:productId",
  deleteProduct: "/delete-product",
};
const VIEW_ROUTES = {
  adminProducts: "admin/products",
  adminEditProduct: "admin/edit-product",
};

module.exports = {
  URL_ROUTES,
  ADMIN_URL_ROUTES,
  VIEW_ROUTES,
};
