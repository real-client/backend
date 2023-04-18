import Volunteer from "../models/volunteersModels.js";

//get all volunteersRoutes
export const getAllVolunteers = async (req,res) => {
    try {
        const volunteers = await volunteers.find();
        res.json(volunteers);
    } catch (err) {
        res.status(500).json({message : err.message});
    }
};

//get volunteer by ID
export const getVolunteerByID = async (req, res) => {
    try{
        const volunteer = await volunteer.findById(req.params.id);
        if (!volunteer) {
            return res.status(404).json({message:"volunteer not found"});
        }  
    } catch (err) {
        res.status(500).json({message : err.message});
    }
};

//create new volunteer
export const createVolunteer = async (req, res) => {
    const volunteer = new Volunteer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        title: req.body.title,
        faculty: req.body.faculty,
        branch: req.body.branch,
        startingDate: req.body.startingDate,
        endingDate: req.body.endingDate,
      });
    try{
        const newVolunteer = await volunteer.save();
        res.status(201).json(newVolunteer);
    } catch (err) {
        req.status(500).json({message: err.message});   
    }
};

//update an existing volunteer
export const updateVolunteer = async (req, res) => {
    try {
        const volunteer = await volunteer.findById(req.params.id);
        if (!volunteer) {
            return res.status(404).json({message: 'Volunteer not found'});
        }
        volunteer.firstName = req.body.firstName;
        volunteer.lastName = req.body.lastName;
        volunteer.title = req.body.title;
        volunteer.faculty = req.body.faculty;
        volunteer.branch = req.body.branch;
        volunteer.startingDate = req.body.startingDate;
        volunteer.endingDate = req.body.endingDate;
        
        const updatedVolunteer = await volunteer.save ();
        res.json(updatedVolunteer);

    } catch (err) {
        req.status(500).json({message: err.message});
    }
};

//delete volunteer by ID
export const deleteVolunteer = async (req, res) => {
    try {
        const volunteer = await Volunteer.findById(req.params.id);
        if (!volunteer) {
          return res.status(404).json({ message: 'Volunteer not found' });
        }
        await volunteer.remove();
        res.json({ message: 'Volunteer deleted successfully' });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    };