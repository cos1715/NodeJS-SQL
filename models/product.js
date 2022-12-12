const Cart = require("./cart");
const db = require("../util/db");

module.exports = class Product {
  constructor({ id, title, imageUrl, description, price }) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static async findById(id) {
    return db.execute(`SELECT * FROM products WHERE products.id = ?`, [id]);
  }

  static async deleteById(id) {
    if (id) {
      db.execute(`DELETE FROM products WHERE products.id = ?`, [id])
        .then((data) => {
          console.log("delete", data);
        })
        .catch((err) => {
          console.log("delete err", err);
        });
      // delete from cart
    } else {
      throw "No id provided";
    }
  }

  async save() {
    if (this.id) {
      db.execute(
        `UPDATE products SET title = ?, price = ?, description = ?, imageUrl = ? WHERE products.id = ?`,
        [this.title, this.price, this.description, this.imageUrl, id]
      );
    } else {
      db.execute(
        `INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)`,
        [this.title, this.price, this.description, this.imageUrl]
      );
    }
  }
};
