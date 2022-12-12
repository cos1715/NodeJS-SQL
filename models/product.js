const fs = require("fs");
const path = require("path");
const Cart = require("./cart");
const rootDir = require("../util/path");
const filePath = path.join(rootDir, "data", "products.json");

module.exports = class Product {
  constructor({ id, title, imageUrl, description, price }) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  static fetchAll() {
    let products = [];
    const fileBody = [];
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, fileContent) => {
        if (!err) {
          fileBody.push(fileContent);
          const bufferData = Buffer.concat(fileBody).toString();
          products = JSON.parse(bufferData);
        }
        resolve(products);
      });
    });
  }

  static async findById(id) {
    const products = await Product.fetchAll();
    const product = products.find((prod) => prod.id === id);

    return product;
  }

  static async deleteById(id) {
    if (id) {
      const products = await Product.fetchAll();
      const newProducts = products.filter((data) => data.id !== id);
      fs.writeFile(filePath, JSON.stringify(newProducts), (err) => {
        if (err) {
          console.log("delete err==>", err);
        } else {
          Cart.deleteProduct(id);
        }
      });
    } else {
      throw "No id provided";
    }
  }

  async save() {
    const products = await Product.fetchAll();
    if (this.id) {
      const productIndex = products.findIndex((data) => data.id === this.id);
      products[productIndex] = this;
    } else {
      this.id = Math.floor(Math.random() * 100 + 1).toString();
      products.push(this);
    }
    fs.writeFile(filePath, JSON.stringify(products), (err) => {
      if (err) {
        console.log("save err==>", err);
      }
    });
  }
};
