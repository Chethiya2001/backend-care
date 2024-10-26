import express from "express";
import {
  addTreatment,
  getTreatments,
  getTreatmentById,
  updateTreatment,
  deleteTreatment,
  
} from "../controllers/treatmentController.js"; // Adjust path as needed

const router = express.Router();

// Route to add a new treatment
router.post("/", addTreatment);

// Route to get all treatments
router.get("/", getTreatments);

// Route to get a treatment by ID
router.get("/:id", getTreatmentById);

// Route to update a treatment by ID
router.put("/:id", updateTreatment);

// Route to delete a treatment by ID
router.delete("/:id", deleteTreatment);

export default router;
