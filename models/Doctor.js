import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Doctor = sequelize.define("Doctor", {

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
  qualifications: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
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
  age:{
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  nic: {
    type: DataTypes.STRING,
    allowNull: true,
    primaryKey: true,
  },
});

export default Doctor;
