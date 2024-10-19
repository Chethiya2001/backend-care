import Appointment from "../models/Appoiment.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";

// Create a new appointment
export const createAppointment = async (req, res) => {
  try {
    const { doctorId, patientId, date, time, appointmentNumber } = req.body;

    // Ensure doctor and patient exist
    const doctor = await Doctor.findByPk(doctorId);
    const patient = await Patient.findByPk(patientId);

    if (!doctor || !patient) {
      return res.status(404).json({ message: "Doctor or Patient not found" });
    }

    // Create new appointment
    const appointment = await Appointment.create({
      doctorId,
      patientId,
      date,
      time,
      appointmentNumber,
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Error creating appointment", error });
  }
};

// Get all appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: [
        { model: Doctor, attributes: ["nic", "name"] }, // Fetch doctor details
        { model: Patient, attributes: ["nic", "name"] }, // Fetch patient details
      ],
    });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
};

// Get a single appointment by ID
export const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByPk(id, {
      include: [
        { model: Doctor, attributes: ["nic", "name"] },
        { model: Patient, attributes: ["nic", "name"] },
      ],
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointment", error });
  }
};

// Update an appointment
export const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, time, appointmentNumber, doctorId, patientId } = req.body;

    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Check if doctor and patient exist
    const doctor = await Doctor.findByPk(doctorId);
    const patient = await Patient.findByPk(patientId);

    if (!doctor || !patient) {
      return res.status(404).json({ message: "Doctor or Patient not found" });
    }

    // Update appointment details
    appointment.date = date;
    appointment.time = time;
    appointment.appointmentNumber = appointmentNumber;
    appointment.doctorId = doctorId;
    appointment.patientId = patientId;

    await appointment.save();

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Error updating appointment", error });
  }
};

// Delete an appointment
export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    await appointment.destroy();

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting appointment", error });
  }
};
