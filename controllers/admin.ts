import { RequestHandler } from "express";
import Product, { IProduct } from "../models/product";
import User from "../models/user";
import { ADMIN_URL_ROUTES, VIEW_ROUTES } from "../const";

export const getAddProduct: RequestHandler = (req, res, next) => {
  res.render(VIEW_ROUTES.adminEditProduct, {
    pageTitle: "Add Product",
    path: `/admin${ADMIN_URL_ROUTES.addProduct}`,
    edit: false,
    product: {},
  });
};

export const postAddProduct: RequestHandler = (req: any, res, next) => {
  (req.user as User)
    .createProduct({
      title: req.body.title,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
      price: req.body.price,
    })
    .then(() => {
      res.redirect(`/admin${ADMIN_URL_ROUTES.products}`);
    })
    .catch((err) => console.log("postAddProduct err", err));
};

export const getProducts: RequestHandler = (req: any, res, next) => {
  (req.user as User).getProducts().then((data) => {
    res.render(VIEW_ROUTES.adminProducts, {
      prods: data,
      pageTitle: "Admin Products",
      path: `/admin${ADMIN_URL_ROUTES.products}`,
    });
  });
};

export const getEditProduct: RequestHandler = async (req: any, res, next) => {
  const edit = req.query.edit === "true";
  if (!edit) {
    res.redirect(`/admin${ADMIN_URL_ROUTES.products}`);
  } else {
    const productId = req.params.productId;
    const [product] = await (req.user as User).getProducts({
      where: { id: productId },
    });
    // const product = await Product.findByPk(productId);
    if (product) {
      res.render(VIEW_ROUTES.adminEditProduct, {
        pageTitle: "Edit Product",
        path: `/admin${ADMIN_URL_ROUTES.editProductId}`,
        edit,
        product,
      });
    } else {
      res.redirect(`/admin${ADMIN_URL_ROUTES.products}`);
    }
  }
};

export const postEditProduct: RequestHandler<any, any, IProduct> = async (
  req,
  res,
  next
) => {
  const body = req.body;
  try {
    const product = await Product.findByPk(body.id);
    if (product) {
      product.set({
        title: body.title,
        price: body.price,
        imageUrl: body.imageUrl,
        description: body.description,
      });
      await product.save();
      res.redirect(`/admin${ADMIN_URL_ROUTES.products}`);
    }
  } catch (err) {
    console.log("postEditProduct err", err);
  }
};

export const postDeleteProduct: RequestHandler = (req, res, next) => {
  const body = req.body;
  Product.findByPk(body.id)
    .then((data) => data && data.destroy())
    .then(() => {
      res.redirect(`/admin${ADMIN_URL_ROUTES.products}`);
    })
    .catch((err) => {
      console.log("postDeleteProduct err", err);
      res.redirect(`/admin${ADMIN_URL_ROUTES.products}`);
    });
};
