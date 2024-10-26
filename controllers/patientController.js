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

export const getAllPatientsByName = async (req, res) => {
  try {
    const doctors = await Patient.findAll({
      attributes: ["nic", "name"],
    });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).send(`Error fetching doctors: ${error.message}`);
  }
};

export const updatePatient = async (req, res) => {
  try {
    const { nic } = req.params;
    const { name, address, email, age, gender, contact } = req.body;

    const patient = await Patient.findByPk(nic);

    if (!patient) {
      return res.status(404).json({ message: " patient not found" });
    }

    await Patient.update({
      nic,
      name,
      address,
      email,
      gender,
      contact,
      age,
    });

    res.status(200).json({
      message: "Patient updated successfully",
      patient,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error updating Doctor: ${error.message}` });
  }
};

export const deletepatient = async (req, res) => {
  try {
    const { nic } = req.params;
    const patient = await Patient.findByPk(nic);

    if (!patient) {
      return res.status(404).json({ message: "patient not found" });
    }

    await patient.destroy();

    res.status(200).json({ message: "patient deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error deleting patient: ${error.message}` });
  }
};

export const getPatientByNic = async (req, res) => {
  try {
    const { nic } = req.params;

    const patient = await Patient.findOne({
      where: {
        nic: nic,
      },
    });

    if (!patient) {
      return res.status(404).json({ message: "patient not found" });
    }

    res.status(200).json(patient);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching patient: ${error.message}` });
  }
};
