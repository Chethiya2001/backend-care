import Roles from "../models/Role.js";

export const getRoles = async (req, res) => {
  try {
    const roles = await Roles.findAll({ attributes: ["id", "name"] });
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).send(`Error fetching roles: ${error.message}`);
  }
};
