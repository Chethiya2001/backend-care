import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Doctor from "./Doctor.js";

const Treatment = sequelize.define("Treatment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  prescribe: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  medicine_discription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Illness_description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  treatment_type_discription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_time: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  patient_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  doctorNic: {
    // Updated field name
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Doctor, 
      key: "nic", 
    },
  },
});

Treatment.belongsTo(Doctor, { foreignKey: "doctorNic" });

export default Treatment;
