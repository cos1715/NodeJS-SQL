import { Sequelize } from "sequelize";

const sequelize = new Sequelize("node-complete", "root", "11111111", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
