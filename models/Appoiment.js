import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Doctor from "./Doctor.js"; // Assuming Doctor model is already defined
import Patient from "./Patient.js"; // Assuming Patient model is already defined

const Appointment = sequelize.define("Appointment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  appointmentNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
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

Appointment.belongsTo(Doctor, { foreignKey: "doctorNic" });
Appointment.belongsTo(Patient, { foreignKey: "patientNic" });

export default Appointment;
