import path from "path";

import express from "express";
import bodyParser from "body-parser";

import { getNotFound } from "./controllers/error";

import adminRoutes from "./routes/admin";
import shopRoutes from "./routes/shop";

import sequelize from "./util/db";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(getNotFound);

sequelize
  .sync()
  .then((data) => {
    app.listen(3003);
  })
  .catch((err) => console.log(err));
