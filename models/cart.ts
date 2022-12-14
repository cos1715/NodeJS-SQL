import fs from "fs";
import path from "path";
import rootDir from "../util/path";
const filePath = path.join(rootDir, "data", "cart.json");

class Cart {
  static getCart() {
    const fileBody: any[] = [];
    let cart = { products: [], totalPrice: 0 };
    return new Promise((resolve) => {
      fs.readFile(filePath, (err, fileContent) => {
        if (!err) {
          fileBody.push(fileContent);
          const data = Buffer.concat(fileBody).toString();
          cart = JSON.parse(data);
        }

        resolve(cart);
      });
    });
  }

  static async addProduct(id: any, productPrice: any) {
    const cart: any = await Cart.getCart();
    const index = cart.products.findIndex((prod: any) => prod.id === id);
    const newProduct = cart.products[index] || {};

    if (index >= 0) {
      newProduct.qty++;
      cart.products[index] = newProduct;
    } else {
      newProduct.id = id;
      newProduct.qty = 1;
      newProduct.price = Number.parseFloat(productPrice);
      cart.products = [...cart.products, newProduct];
    }
    cart.totalPrice += Number.parseFloat(productPrice);

    fs.writeFile(filePath, JSON.stringify(cart), (err) => {
      console.log(err);
    });
  }

  static async deleteProduct(id: any) {
    const cart: any = await Cart.getCart();
    let price = cart.totalPrice;
    const products = cart.products.filter((data: any) => {
      if (data.id === id) {
        const productPrice = data.price * data.qty;
        price -= productPrice;
      }
      return data.id !== id;
    });
    cart.products = products;
    cart.totalPrice = price;
    fs.writeFile(filePath, JSON.stringify(cart), (err) => {
      console.log(err);
    });
  }
}

export default Cart;
