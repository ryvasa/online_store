import { Sequelize } from "sequelize";

const db = new Sequelize("online_store", "root", "123", {
  host: "localhost",
  dialect: "mysql",
});
export default db;
