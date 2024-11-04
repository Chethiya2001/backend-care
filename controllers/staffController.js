import Staff from "../models/Medicals.js";
import bcrypt from "bcrypt";
const jwtSecret = "ADBC45321F475";
import jwt from "jsonwebtoken";
export const addStaff = async (req, res) => {
  try {
    const { name, address, email, contact, nic, age, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const staff = await Staff.create({
      name,
      address,
      email,
      contact,
      nic,
      password: hashedPassword,
      age,
      role: "staff",
    });
    res.status(201).json({
      message: "Staff added successfully",
      staff,
    });
  } catch (error) {
    console.error("Error creating staff:", error);
    res.status(500).json({ message: `Error creating staff: ${error.message}` });
  }
};

export const getStaff = async (req, res) => {
  try {
    const staffs = await Staff.findAll();
    res.status(200).json(staffs);
  } catch (error) {
    res.status(500).send(`Error fetching staffs: ${error.message}`);
  }
};

export const updateStaff = async (req, res) => {
  try {
    const { nic } = req.params;
    const { name, address, email, qualifications, age, gender, contact } =
      req.body;

    const staff = await Staff.findByPk(nic);

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    // Update staff details
    await Staff.update(
      {
        name,
        address,
        email,
        qualifications,
        gender,
        contact,
        age,
      },
      { where: { nic } } // Add where condition to specify which staff to updatedoctor
    );

    // Fetch the updated staff to return the updated details
    const updatedStaff = await Staff.findByPk(nic);

    res.status(200).json({
      message: "Staff updated successfully",
      updatedStaff,
    });
  } catch (error) {
    res.status(500).json({ message: `Error updating staff: ${error.message}` });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const { nic } = req.params;
    const staff = await Staff.findByPk(nic);

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    await staff.destroy();

    res.status(200).json({ message: "Staff deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: `Error deleting Staff: ${error.message}` });
  }
};

export const getStaffByNic = async (req, res) => {
  try {
    const { nic } = req.params;

    const staff = await Staff.findOne({
      where: {
        nic: nic,
      },
    });

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: `Error fetching Staff: ${error.message}` });
  }
};

export const loginStaff = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await Staff.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send("Staff member not found");
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

    res.status(200).json({
      message: "Login successful",
      token: token,
      role: user.role,
      nic: user.nic,
    });
  } catch (error) {
    res.status(500).send(`Error during login: ${error.message}`);
  }
};
