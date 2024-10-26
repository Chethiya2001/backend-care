import express from "express";
import {
  createPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
} from "../controllers/paymentController.js"; // Adjust the path as necessary

const router = express.Router();

// Routes for payments
router.post("/", createPayment); // Create a new payment
router.get("/", getPayments); // Get all payments
router.get("/:id", getPaymentById); // Get a specific payment by ID
router.put("/:id", updatePayment); // Update a payment
router.delete("/:id", deletePayment); // Delete a payment

export default router;
