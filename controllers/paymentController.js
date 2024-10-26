import Payment from "../models/Payment.js"; // Adjust the path as necessary

// Create a new payment
export const createPayment = async (req, res) => {
  const { doctor_charge, hospital_charge, doctorNic, patientNic } = req.body;

  try {
    const newPayment = await Payment.create({
      doctor_charge,
      hospital_charge,
      doctorNic,
      patientNic,
    });
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all payments
export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific payment by ID
export const getPaymentById = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a payment
export const updatePayment = async (req, res) => {
  const { id } = req.params;
  const { doctor_charge, hospital_charge, doctorNic, patientNic } = req.body;

  try {
    const [updated] = await Payment.update(
      { doctor_charge, hospital_charge, doctorNic, patientNic },
      { where: { id } }
    );

    if (!updated) {
      return res.status(404).json({ message: "Payment not found" });
    }

    const updatedPayment = await Payment.findByPk(id);
    res.status(200).json(updatedPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a payment
export const deletePayment = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Payment.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
