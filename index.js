import express from "express";
import bodyParser from "body-parser";
import DoctorRoutes from "./routes/doctor.js";
import starfRoutes from "./routes/staff.js";
import sequelize from "./db.js";
import AuthRoutes from "./routes/auth.js";
import TreatmentRoutes from "./routes/treatment.js";
import AppointmentRoutes from "./routes/appoiment.js";
import PatientRoutes from "./routes/patient.js";
import paymentRoutes from "./routes/payment.js";

import cors from "cors";

const app = express();
const PORT = 5001;

app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use("/auth", AuthRoutes);
app.use("/auth/login", AuthRoutes);
app.use("/doctor", DoctorRoutes);
app.use("/staff", starfRoutes);
app.use("/treatment", TreatmentRoutes);
app.use("/appointment", AppointmentRoutes);
app.use("/patient", PatientRoutes);
app.use("/payment", paymentRoutes);

const startServer = async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () =>
      console.log(`Server started on port: http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
