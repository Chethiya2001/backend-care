import express from "express";
import {
  addDoctor,
  getDoctors,
  updateDoctor,
  deleteDoctor,
  getDoctorByNic,
  getAllDoctorsByName,
  loginDoctor,

} from "../controllers/doctorController.js";

const router = express.Router();

// Route to add a doctor
router.post("/", addDoctor);

// Route to get all doctors
router.get("/", getDoctors);

// Route to get all doctors by name
router.get("/name", getAllDoctorsByName);

// Route to login a doctor
router.post("/login", loginDoctor);

// Route to get a specific doctor by NIC
router.get("/nic/:nic", getDoctorByNic);

// Route to update a doctor by NIC
router.put("/:nic", updateDoctor);

// Route to delete a doctor by NIC
router.delete("/:nic", deleteDoctor);


export default router;
