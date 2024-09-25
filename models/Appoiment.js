import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Doctor from "./Doctor.js";  // Assuming Doctor model is already defined
import Patient from "./Patient.js";  // Assuming Patient model is already defined

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
  doctorId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Doctor,  
      key: 'id',
    },
  },
  patientId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Patient,  
      key: 'id',
    },
  }
});


Appointment.belongsTo(Doctor, { foreignKey: 'doctorId' });
Appointment.belongsTo(Patient, { foreignKey: 'patientId' });

export default Appointment;
