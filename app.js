const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const { getNotFound } = require("./controllers/error");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const sequelize = require("./util/db");

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
