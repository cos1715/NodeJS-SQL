import { RequestHandler } from "express";
import Product, { IProduct } from "../models/product";
import Cart from "../models/cart";

export const getIndex: RequestHandler = (req, res, next) => {
  Product.findAll()
    .then((data) => {
      res.render("shop/index", {
        pageTitle: "Shop",
        prods: data,
        path: "/",
      });
    })
    .catch((err) => console.log("getIndex err", err));
};

export const getProducts: RequestHandler = (req, res, next) => {
  Product.findAll().then((data) => {
    res.render("shop/product-list", {
      pageTitle: "All Products",
      prods: data,
      path: "/products",
    });
  });
};

export const getProductDetails: RequestHandler = (req, res, next) => {
  const id = req.params.productId;
  Product.findByPk(id).then((data) => {
    res.render("shop/product-detail", {
      pageTitle: "Product Details",
      product: data,
      path: `/products`,
    });
  });
};

export const getCart: RequestHandler = async (req, res, next) => {
  // const cart = await Cart.getCart();
  // const [allProducts] = await Product.fetchAll();
  // const usedProducts = allProducts.reduce((acc, product) => {
  //   const usedProduct = cart.products.find(
  //     (cartProduct) => cartProduct.id === product.id
  //   );
  //   return usedProduct ? [...acc, { ...usedProduct, ...product }] : acc;
  // }, []);

  res.render("shop/cart", {
    pageTitle: "Your Cart",
    products: [],
    path: `/cart`,
  });
};

export const postCart: RequestHandler = async (req, res, next) => {
  // const prodId = req.body.productId;
  // const [product] = await Product.findById(prodId);
  // await Cart.addProduct(prodId, product[0].price);
  res.redirect("/");
};

export const deleteCartItem: RequestHandler = async (req, res, next) => {
  const prodId = req.body.id;
  await Cart.deleteProduct(prodId);
  res.redirect("/cart");
};

export const getOrders: RequestHandler = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "/orders",
  });
};

export const getCheckout: RequestHandler = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
