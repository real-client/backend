import Volunteer from "../models/volunteersModels.js";

//get all volunteersRoutes
export const getAllVolunteers = async (req,res) => {
    try {
        const volunteers = await Volunteer.find();
        res.json(volunteers);
    } catch (err) {
        res.status(500).json({message : err.message});
    }
};

//get volunteer by ID
export function getVolunteerByID(req, res, next) {
    let { id } = req.params;
    Volunteer.findOne({ _id: id })
      .then((response) => {
        if (!response) {
          res.status(404).send({ message: "volunteer not found" });
        } else {
          res.status(200).send({ response });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
        next(err);
      });
  }

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
        const volunteer = await Volunteer.findById(req.params.id);
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
export function deleteVolunteer(req, res, next) {
    let { id } = req.params;
    Volunteer.findByIdAndDelete(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "volunteer not found" });
        } else {
          res.status(200).send({ success: true, message: "delete successfully" });
        }
      })
  
      .catch((err) => {
        res.status(500).send({ message: "error deleting Opportunity" });
      });
  }