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
  const product = new Product({
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
    price: req.body.price,
  });

  product.save().then(() => {
    res.redirect(`/admin${ADMIN_URL_ROUTES.products}`);
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then((data) => {
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
    const product = await Product.findById(productId);
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

exports.postEditProduct = (req, res, next) => {
  const body = req.body;
  const product = new Product(body);
  product
    .save()
    .then(() => {
      res.redirect(`/admin${ADMIN_URL_ROUTES.products}`);
    })
    .catch((err) => console.log("postEditProduct err", err));
};

exports.postDeleteProduct = (req, res, next) => {
  const body = req.body;
  Product.deleteById(body.id)
    .then(() => {
      res.redirect(`/admin${ADMIN_URL_ROUTES.products}`);
    })
    .catch((err) => {
      console.log("postDeleteProduct err", err);
      res.redirect(`/admin${ADMIN_URL_ROUTES.products}`);
    });
};
