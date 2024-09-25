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

export const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByPk(id);
    if (!patient) {
      return res.status(404).send("patient not found");
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).send(`Error fetching patient: ${error.message}`);
  }
};

export const updatepatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, email, contact, nic, age, gender } = req.body;

    const [updated] = await Patient.update(
      {
        name,
        address,
        email,
        contact,
        nic,
        age,
        gender,
      },
      {
        where: { id },
      }
    );
    if (updated === 0) {
      return res.status(404).send("patient not found");
    }

    if (!updated) {
      return res.status(404).send("patient not found");
    }
    const updatedpatient = await patient.findByPk(id);
    res.status(200).json(updatedpatient);
  } catch (error) {
    res.status(500).send(`Error updating patient: ${error.message}`);
  }
};

export const deletepatient = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Patient.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).send("patient not found");
    }
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).send(`Error deleting patient: ${error.message}`);
  }
};
