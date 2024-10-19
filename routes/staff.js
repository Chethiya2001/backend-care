import express from "express";
const router = express.Router();

import {
  addStaff,
  getStaff,
  deleteStaff,
  getStaffByNic,
  updateStaff,
} from "../controllers/staffController.js";

router.post("/", addStaff);
router.get("/", getStaff);
router.delete("/:nic", deleteStaff);
router.get("/nic/:nic", getStaffByNic);
router.put("/:nic", updateStaff);

export default router;
