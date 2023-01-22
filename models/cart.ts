import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  BelongsToManyCreateAssociationMixin,
  Association,
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManySetAssociationsMixin,
} from "sequelize";
import sequelize from "../util/db";
import { IProductModel } from "./product";

// Foo.hasOne(Bar)
// fooInstance.getBar()
// fooInstance.setBar()
// fooInstance.createBar()

// Foo.hasMany(Bar)
// fooInstance.getBars()
// fooInstance.countBars()
// fooInstance.hasBar()
// fooInstance.hasBars()
// fooInstance.setBars()
// fooInstance.addBar()
// fooInstance.addBars()
// fooInstance.removeBar()
// fooInstance.removeBars()
// fooInstance.createBar()

class Cart extends Model<InferAttributes<Cart>, InferCreationAttributes<Cart>> {
  declare id: CreationOptional<number>;

  declare getProducts: BelongsToManyGetAssociationsMixin<IProductModel>; // Note the null assertions!
  declare addProduct: BelongsToManyAddAssociationMixin<IProductModel, number>;
  declare addProducts: BelongsToManyAddAssociationsMixin<IProductModel, number>;
  declare setProducts: BelongsToManySetAssociationsMixin<IProductModel, number>;
  declare removeProduct: BelongsToManyRemoveAssociationMixin<
    IProductModel,
    number
  >;
  declare removeProducts: BelongsToManyRemoveAssociationsMixin<
    IProductModel,
    number
  >;
  declare hasProduct: BelongsToManyHasAssociationMixin<IProductModel, number>;
  declare hasProducts: BelongsToManyHasAssociationsMixin<IProductModel, number>;
  declare countProducts: BelongsToManyCountAssociationsMixin;
  declare createProduct: BelongsToManyCreateAssociationMixin<IProductModel>;

  declare static associations: {
    products: Association<Cart, IProductModel>;
  };
}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "cart",
  }
);

export default Cart;
