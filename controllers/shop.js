const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getIndex = (req, res, next) => {
  Product.fetchAll().then((data) => {
    res.render("shop/index", {
      pageTitle: "Shop",
      prods: data,
      path: "/",
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then((data) => {
    res.render("shop/product-list", {
      pageTitle: "All Products",
      prods: data,
      path: "/products",
    });
  });
};

exports.getProductDetails = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id).then((data) => {
    res.render("shop/product-detail", {
      pageTitle: "Product Details",
      product: data,
      path: `/products`,
    });
  });
};

exports.getCart = async (req, res, next) => {
  const cart = await Cart.getCart();
  const allProducts = await Product.fetchAll();
  const usedProducts = allProducts.reduce((acc, product) => {
    const usedProduct = cart.products.find(
      (cartProduct) => cartProduct.id === product.id
    );
    return usedProduct ? [...acc, { ...usedProduct, ...product }] : acc;
  }, []);

  res.render("shop/cart", {
    pageTitle: "Your Cart",
    products: usedProducts,
    path: `/cart`,
  });
};

exports.postCart = async (req, res, next) => {
  const prodId = req.body.productId;
  const product = await Product.findById(prodId);
  await Cart.addProduct(prodId, product.price);
  res.redirect("/");
};

exports.deleteCartItem = async (req, res, next) => {
  const prodId = req.body.id;
  await Cart.deleteProduct(prodId);
  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "/orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};