import Team from "../models/teamModels.js";

//get all teams
export const getAllTeams = async (req, res) => {
    try {
        const teams = await Team.find();
        res.json(teams);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//get team by ID
export const getTeamByID = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) {
          return res.status(404).json({ message: 'Team not found' });
        }
        res.json(team);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//create new team
export const createTeam = async (req, res) => {
    const team = new Team({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        images: req.body.images,
        title: req.body.title,
        email: req.body.email,
        linkedin: req.body.linkedin,
        role: req.body.role
      });
      try {
        const newTeam = await team.save();
        res.status(201).json(newTeam);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//update an existing team
export const updateTeam = async (req, res) => {
    try {
        const team = await team.findById(req.params.id);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        team.firstName = req.body.firstName;
        team.lastName = req.body.lastName;
        team.images = req.body.images;
        team.title = req.body.title;
        team.email = req.body.email;
        team.linkedin = req.body.linkedin;
        team.role = req.body.role;

        const updatedTeam = await team.save ();
        res.json(updatedTeam);
    }   catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//delete team by ID
export const deleteTeam = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) {
          return res.status(404).json({ message: 'Team not found' });
        }
        await team.remove();
        res.json({ message: 'Team deleted successfully' });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    };
