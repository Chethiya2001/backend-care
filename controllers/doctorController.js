import Doctor from "../models/Doctor.js";
const jwtSecret = "ADBC45321F475";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const addDoctor = async (req, res) => {
  try {
    const {
      name,
      address,
      email,
      password,
      qualifications,
      contact,
      gender,
      nic,
      age,
    } = req.body;
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    const doctor = await Doctor.create({
      name,
      address,
      email,
      qualifications,
      gender,
      contact,
      password: hashedPassword,
      nic,
      age,
    });
    res.status(201).json({
      message: "Doctor added successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).send(`Error creating user: ${error.message}`);
  }
};

export const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user by email
    const user = await Doctor.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send("Doctor not found");
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid email or password");
    }

    // Create a JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
      expiresIn: "24h",
    });

    res.status(200).json({ message: "Login successful", token, data: user });
  } catch (error) {
    res.status(500).send(`Error during login: ${error.message}`);
  }
};

export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).send(`Error fetching doctors: ${error.message}`);
  }
};
export const getAllDoctorsByName = async (req, res) => {
  try {
    const doctors = await Doctor.findAll({
      attributes: ["nic", "name"],
    });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).send(`Error fetching doctors: ${error.message}`);
  }
};
export const updateDoctor = async (req, res) => {
  try {
    const { nic } = req.params;
    const { name, address, email, qualifications, age, gender, contact } =
      req.body;

    const doctor = await Doctor.findByPk(nic);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    await Doctor.update({
      name,
      address,
      email,
      qualifications,
      gender,

      contact,
      age,
    });

    res.status(200).json({
      message: "Doctor updated successfully",
      doctor,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error updating Doctor: ${error.message}` });
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    const { nic } = req.params;
    const animal = await Doctor.findByPk(nic);

    if (!animal) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    await animal.destroy();

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error deleting Doctor: ${error.message}` });
  }
};

export const getDoctorByNic = async (req, res) => {
  try {
    const { nic } = req.params;

    const doctor = await Doctor.findOne({
      where: {
        nic: nic,
      },
    });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(doctor);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching Doctor: ${error.message}` });
  }
};
