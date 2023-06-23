import Volunteer from "../models/volunteersModels.js";
import fs from "fs";

//get all volunteersRoutes
export const getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.status(200).json({ success: true, message: volunteers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get volunteer by ID
export const getVolunteerByID = async (req, res) => {
  try {
    const volunteerId = req.params.id;
    const volunteer = await Volunteer.findById(volunteerId);

    if (!volunteer) {
      return res.status(404).json({ error: "Volunteer not found" });
    }

    res.status(200).json({ success: true, message: volunteer });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch volunteer" });
  }
};

//create new volunteer
export const createVolunteer = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      image,
      title,
      faculty,
      branch,
      starting_date,
      ending_date,
      is_active,
      contact,
    } = req.body;

    const newVolunteer = new Volunteer({
      first_name,
      last_name,
      image,
      title,
      faculty,
      branch,
      starting_date,
      ending_date,
      is_active,
      contact,
    });

    const savedVolunteer = await newVolunteer.save();
    res.status(201).json({ success: true, message: savedVolunteer });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      res.status(400).json({ error: errors });
    } else {
      res.status(500).json({ error: "Failed to create volunteer" });
    }
  }
};

//update an existing volunteer
export const updateVolunteer = async (req, res) => {
  try {
    const volunteerId = req.params.id; // Assuming the volunteer ID is passed as a route parameter
    const updatedData = req.body;

    const volunteer = await Volunteer.findById(volunteerId);

    if (!volunteer) {
      return res.status(404).json({ error: "Volunteer not found" });
    }

    // Check if an image is provided in the updated data
    if (updatedData.image) {
      // Delete the old image if it exists
      if (volunteer.image) {
        fs.unlinkSync(volunteer.image); // Delete the old image file from the server
      }

      volunteer.image = updatedData.image; // Set the new image path
    }

    // Update other fields in the volunteer object
    volunteer.first_name = updatedData.first_name || volunteer.first_name;
    volunteer.last_name = updatedData.last_name || volunteer.last_name;
    volunteer.title = updatedData.title || volunteer.title;
    volunteer.faculty = updatedData.faculty || volunteer.faculty;
    volunteer.branch = updatedData.branch || volunteer.branch;
    volunteer.starting_date =
      updatedData.starting_date || volunteer.starting_date;
    volunteer.ending_date = updatedData.ending_date || volunteer.ending_date;
    volunteer.is_active = updatedData.is_active || volunteer.is_active;
    volunteer.contact = updatedData.contact || volunteer.contact;

    const savedVolunteer = await volunteer.save();

    res.status(200).json(savedVolunteer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//delete volunteer by ID
export const deleteVolunteer = async (req, res) => {
  try {
    const volunteerId = req.params.id;

    const volunteer = await Volunteer.findById(volunteerId);

    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    if (volunteer.image) {
      fs.unlinkSync(volunteer.image);
    }

    await Volunteer.findByIdAndDelete(volunteerId);

    res
      .status(200)
      .json({ success: true, message: "Volunteer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
