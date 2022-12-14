const Product = require("../models/product");
const { ADMIN_URL_ROUTES, VIEW_ROUTES } = require("../const");

exports.getAddProduct = (req, res, next) => {
  res.render(VIEW_ROUTES.adminEditProduct, {
    pageTitle: "Add Product",
    path: `/admin${ADMIN_URL_ROUTES.addProduct}`,
    edit: false,
    product: {},
  });
};

exports.postAddProduct = (req, res, next) => {
  Product.create({
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

exports.getProducts = (req, res, next) => {
  Product.findAll().then((data) => {
    res.render(VIEW_ROUTES.adminProducts, {
      prods: data,
      pageTitle: "Admin Products",
      path: `/admin${ADMIN_URL_ROUTES.products}`,
    });
  });
};

exports.getEditProduct = async (req, res, next) => {
  const edit = req.query.edit === "true";
  if (!edit) {
    res.redirect(`/admin${ADMIN_URL_ROUTES.products}`);
  } else {
    const productId = req.params.productId;
    const product = await Product.findByPk(productId);
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

exports.postEditProduct = async (req, res, next) => {
  const body = req.body;
  try {
    const product = await Product.findByPk(body.id);
    product.title = body.title;
    product.price = body.price;
    product.imageUrl = body.imageUrl;
    product.description = body.description;
    await product.save();
    res.redirect(`/admin${ADMIN_URL_ROUTES.products}`);
  } catch (err) {
    console.log("postEditProduct err", err);
  }
};

exports.postDeleteProduct = (req, res, next) => {
  const body = req.body;
  Product.findByPk(body.id)
    .then((data) => data.destroy())
    .then(() => {
      res.redirect(`/admin${ADMIN_URL_ROUTES.products}`);
    })
    .catch((err) => {
      console.log("postDeleteProduct err", err);
      res.redirect(`/admin${ADMIN_URL_ROUTES.products}`);
    });
};
