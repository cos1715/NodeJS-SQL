import path from "path";

import express from "express";
import bodyParser from "body-parser";

import { getNotFound } from "./controllers/error";

import adminRoutes from "./routes/admin";
import shopRoutes from "./routes/shop";

import sequelize from "./util/db";
import rootDir from "./util/path";
import User from "./models/user";
import Product from "./models/product";
import Cart from "./models/cart";
import CartItem from "./models/cart-item";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));

app.use(async (req: any, res, next) => {
  try {
    const user = await User.findByPk(1);
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
  }
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(getNotFound);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
  .sync({ force: true })
  // .sync()
  .then((data) => User.findByPk(1))
  .then((user) => {
    return user
      ? Promise.resolve(user)
      : User.create({ name: "Taras", email: "test@gmail.com" });
  })
  .then(async (myUser) => {
    const cart = await myUser.getCart();
    return cart ? Promise.resolve() : myUser.createCart();
  })
  .then(() => app.listen(3003))
  .catch((err) => console.log(err));
