import { RequestHandler } from "express";
import Product, { IProduct } from "../models/product";
import Cart from "../models/cart";
import User from "../models/user";

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

export const getCart: RequestHandler = async (req: any, res, next) => {
  const products: IProduct[] = [];
  try {
    const cart = await (req.user as User).getCart();
    const bdProducts = await cart.getProducts();
    products.push(...bdProducts);
    // console.log("products==>>", (products[0] as any)?.CartItem?.quantity);
  } catch (err) {
    console.log("getCart err=>", err);
  }
  res.render("shop/cart", {
    pageTitle: "Your Cart",
    products,
    path: `/cart`,
  });
};

export const postCart: RequestHandler = async (req: any, res, next) => {
  const prodId = req.body.productId;
  const cart = await (req.user as User).getCart();
  const products = await cart.getProducts({ where: { id: prodId } });
  const productData = await Product.findByPk(prodId);
  let product;
  let newQty = 1;
  if (products.length) {
    product = products[0];
  }
  if (productData) {
    cart.addProduct(productData);
  }
  res.redirect("/");
};

export const deleteCartItem: RequestHandler = async (req, res, next) => {
  const prodId = req.body.id;
  // await Cart.deleteProduct(prodId);
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
