import Treatment from "../models/Treatment.js";

// Add a new treatment
export const addTreatment = async (req, res) => {
  try {
    const {
      id,
      prescribe,
      medicine_discription,
      Illness_description,
      treatment_type_discription,
      date_time,
      patient_name,
      doctorNic,
      patientNic,
    } = req.body;

    const treatment = await Treatment.create({
      id,
      prescribe,
      medicine_discription,
      Illness_description,
      treatment_type_discription,
      date_time,
      patient_name,
      doctorNic,
      patientNic,
    });

    res.status(201).json({
      message: "Treatment added successfully",
      treatment,
    });
  } catch (error) {
    console.error("Error creating treatment:", error);
    res
      .status(500)
      .json({ message: `Error creating treatment: ${error.message}` });
  }
};

// Get all treatments
export const getTreatments = async (req, res) => {
  try {
    const treatments = await Treatment.findAll();
    res.status(200).json(treatments);
  } catch (error) {
    res.status(500).send(`Error fetching treatments: ${error.message}`);
  }
};

// Get treatment by ID
export const getTreatmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const treatment = await Treatment.findByPk(id);
    if (!treatment) {
      return res.status(404).send("Treatment not found");
    }
    res.status(200).json(treatment);
  } catch (error) {
    res.status(500).send(`Error fetching treatment: ${error.message}`);
  }
};

// Update a treatment
export const updateTreatment = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      prescribe,
      medicine_discription,
      Illness_description,
      treatment_type_discription,
      price,
      date_time,
      patient_name,
      doctorNic,
    } = req.body;

    const [updated] = await Treatment.update(
      {
        prescribe,
        medicine_discription,
        Illness_description,
        treatment_type_discription,
        price,
        date_time,
        patient_name,
        doctorNic,
      },
      { where: { id } }
    );

    if (!updated) {
      return res.status(404).send("Treatment not found");
    }

    const updatedTreatment = await Treatment.findByPk(id);
    res.status(200).json(updatedTreatment);
  } catch (error) {
    res.status(500).send(`Error updating treatment: ${error.message}`);
  }
};

// Delete a treatment
export const deleteTreatment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Treatment.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).send("Treatment not found");
    }
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).send(`Error deleting treatment: ${error.message}`);
  }
};
export const getTreatmentsByDoctorNic = async (req, res) => {
  try {
    const { doctorNic } = req.params;
    const treatments = await Treatment.findAll({
      where: { doctorNic },
    });

    if (treatments.length > 0) {
      res.status(200).json(treatments);
    } else {
      res
        .status(404)
        .json({ message: "No treatments found for this patient." });
    }
  } catch (error) {
    console.error("Error fetching treatments:", error);
    res
      .status(500)
      .json({ message: `Error fetching treatments: ${error.message}` });
  }
};
