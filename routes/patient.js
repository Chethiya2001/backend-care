import express from "express";
import {
  addpatient,
  getPatients,
  getPatientByNic,
  updatePatient,
  deletepatient,
  getAllPatientsByName,
} from "../controllers/patientController.js";

const router = express.Router();

// Route to add a doctor
router.post("/", addpatient);
router.get("/", getPatients);
router.get("/name", getAllPatientsByName);
router.get("/nic/:nic", getPatientByNic);
router.put("/:nic", updatePatient);
router.delete("/:nic", deletepatient);

export default router;
