import { Sequelize } from "sequelize";

const sequelize = new Sequelize("node-complete", "root", "plp25plp", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
