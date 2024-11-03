import express from "express";
import {
  getRoles
} from "../controllers/roleController.js";

const router = express.Router();


// Route to get all doctors
router.get("/", getRoles);



export default router;
