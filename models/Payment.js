import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Doctor from "./Doctor.js"; // Assuming Doctor model is already defined
import Patient from "./Patient.js"; // Assuming Patient model is already defined

const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  doctor_charge: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  hospital_charge: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  doctorNic: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Doctor,
      key: "nic",
    },
  },
  patientNic: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Patient,
      key: "nic",
    },
  },
});

Payment.belongsTo(Doctor, { foreignKey: "doctorNic" });
Payment.belongsTo(Patient, { foreignKey: "patientNic" });

export default Payment;
