import express from "express";
import { addSmsAndEmail } from "../controllers/smsController.js"; 

const router = express.Router();


router.post("/", addSmsAndEmail);


// Export the router
export default router;
