import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Roles = sequelize.define("Roles", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Roles;
