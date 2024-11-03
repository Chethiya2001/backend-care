// db.js
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("database_care", "root", "", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

export default sequelize;
