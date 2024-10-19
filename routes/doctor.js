import express from "express";
import {
  addDoctor,
  getDoctors,
  updateDoctor,
  deleteDoctor,
  getDoctorByNic,
} from "../controllers/doctorController.js";

const router = express.Router();

// Route to add a doctor
router.post("/", addDoctor);

// Route to get all doctors
router.get("/", getDoctors);

// Route to get a specific doctor by NIC
router.get("/nic/:nic", getDoctorByNic);

// Route to update a doctor by NIC
router.put("/:nic", updateDoctor);

// Route to delete a doctor by NIC
router.delete("/:nic", deleteDoctor);

export default router;
