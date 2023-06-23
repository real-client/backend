import Team from "../models/teamModels.js";
import fs from "fs";

//get all teams
export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json({ success: true, message: teams });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get team by ID
export const getTeamMemberByID = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json({ success: true, team });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//create new team
export const createTeamMember = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      image,
      title,
      role,
      starting_date,
      ending_date,
      is_active,
      contact,
    } = req.body;

    const teamMember = new Team({
      first_name,
      last_name,
      image,
      title,
      role,
      starting_date,
      ending_date,
      is_active,
      contact,
    });

    const savedTeamMember = await teamMember.save();

    res.status(201).json({ success: true, savedTeamMember });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((val) => {
        return val.message;
      });
      res.status(400).json({ message: errors });
      console.log(err.message);
    } else {
      res.status(500).json({ message: err.message });
    }
  }
};

//update an existing team
export const updateTeamMember = async (req, res) => {
  try {
    const teamId = req.params.id;
    const updatedData = req.body;
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    // Delete previous image if a new image is provided
    if (updatedData.image && team.image !== updatedData.image) {
      if (team.image) {
        // Delete the previous image file
        fs.unlinkSync(team.image);
      }
    }

    // Update team data
    Object.assign(team, updatedData);

    // Save the updated team
    await team.save();

    return res.json(team);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//delete team by ID
export const deleteTeamMember = async (req, res) => {
  try {
    const teamMemberId = req.params.id;
    const teamMember = await Team.findById(teamMemberId);

    if (!teamMember) {
      return res.status(404).json({ message: "Team member not found" });
    }

    if (teamMember.image) {
      fs.unlinkSync(teamMember.image);
    }

    await Team.findByIdAndDelete(teamMemberId);
    res
      .status(200)
      .json({ success: true, message: "Team member deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
