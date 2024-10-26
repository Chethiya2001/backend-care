import express from "express";
import {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByDoctorNic,
} from "../controllers/appoimentController.js";

const router = express.Router();

router.post("/", createAppointment);
router.get("/", getAllAppointments);

router.get("/:id", getAppointmentById);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

router.get("/doctor/:nic", getAppointmentsByDoctorNic);

export default router;
