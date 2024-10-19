import Patient from "../models/Patient.js";

export const addpatient = async (req, res) => {
  try {
    const { name, address, email, contact, nic, age, gender } = req.body;

    const patient = await Patient.create({
      name,
      address,
      email,
      contact,
      nic,
      age,
      gender,
    });
    res.status(201).json({
      message: "Patient added successfully",
      patient,
    });
  } catch (error) {
    console.error("Error creating Patient:", error); // Log the error
    res
      .status(500)
      .json({ message: `Error creating Patient: ${error.message}` }); // Ensure response is JSON
  }
};

export const getPatients = async (req, res) => {
  try {
    const patient = await Patient.findAll();
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).send(`Error fetching staf patient: ${error.message}`);
  }
};



