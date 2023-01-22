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
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  HasOneCreateAssociationMixin,
} from "sequelize";
import sequelize from "../util/db";
import { IProductModel } from "./product";
import Cart from "./cart";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;

  declare getProducts: HasManyGetAssociationsMixin<IProductModel>; // Note the null assertions!
  declare addProduct: HasManyAddAssociationMixin<IProductModel, number>;
  declare addProducts: HasManyAddAssociationsMixin<IProductModel, number>;
  declare setProducts: HasManySetAssociationsMixin<IProductModel, number>;
  declare removeProduct: HasManyRemoveAssociationMixin<IProductModel, number>;
  declare removeProducts: HasManyRemoveAssociationsMixin<IProductModel, number>;
  declare hasProduct: HasManyHasAssociationMixin<IProductModel, number>;
  declare hasProducts: HasManyHasAssociationsMixin<IProductModel, number>;
  declare countProducts: HasManyCountAssociationsMixin;
  declare createProduct: HasManyCreateAssociationMixin<IProductModel, "userId">;

  declare getCart: HasOneGetAssociationMixin<Cart>;
  // declare addCart: HasManyAddAssociationMixin<Cart, number>;
  declare setCart: HasOneSetAssociationMixin<Cart, number>;
  // declare removeCart: HasManyRemoveAssociationMixin<Cart, number>;
  declare createCart: HasOneCreateAssociationMixin<Cart>;

  declare static associations: {
    products: Association<User, IProductModel>;
    cart: Association<User, Cart>;
  };
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);

export default User;
