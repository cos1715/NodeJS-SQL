import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  HasManyCreateAssociationMixin,
  Association,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
} from "sequelize";
import sequelize from "../util/db";
import { IProductModel } from "./product";

// class CartItem extends Model<
//   InferAttributes<CartItem>,
//   InferCreationAttributes<CartItem>
// > {
//   declare id: CreationOptional<number>;
//   declare quantity: number;

//   // declare getProducts: HasManyGetAssociationsMixin<IProductModel>; // Note the null assertions!
//   // declare addProduct: HasManyAddAssociationMixin<IProductModel, number>;
//   // declare addProducts: HasManyAddAssociationsMixin<IProductModel, number>;
//   // declare setProducts: HasManySetAssociationsMixin<IProductModel, number>;
//   // declare removeProduct: HasManyRemoveAssociationMixin<IProductModel, number>;
//   // declare removeProducts: HasManyRemoveAssociationsMixin<IProductModel, number>;
//   // declare hasProduct: HasManyHasAssociationMixin<IProductModel, number>;
//   // declare hasProducts: HasManyHasAssociationsMixin<IProductModel, number>;
//   // declare countProducts: HasManyCountAssociationsMixin;
//   // declare createProduct: HasManyCreateAssociationMixin<IProductModel, "userId">;

//   // declare static associations: {
//   //   products: Association<CartItem, IProductModel>;
//   // };
// }

// CartItem.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     quantity: {
//       type: DataTypes.INTEGER,
//       defaultValue: 1,
//     },
//   },
//   {
//     sequelize,
//     modelName: "cartItem",
//   }
// );

const CartItem = sequelize.define(
  "cartItem",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    quantity: DataTypes.INTEGER,
  },
  {
    tableName: "cartItem",
  }
);
export default CartItem;
