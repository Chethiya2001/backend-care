import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Staff = sequelize.define("Staff", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nic: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "staff",
  },
});

export default Staff;
