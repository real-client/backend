import Model from "../models/opportunityModel.js";

import dotenv from "dotenv";

dotenv.config();

//get all the Opportunity
export async function getAllOpportunity(req, res, next) {
  console.log("database connected");
  try {
    const response = await Model.find().exec();
    res.status(200).send({ success: true, response });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}

//get Opportunity by id
export function getOpportunityByID(req, res, next) {
  let { id } = req.params;
  Model.findOne({ _id: id })
    .then((response) => {
      if (!response) {
        res.status(404).send({ message: "Opportunity not found" });
      } else {
        res.status(200).send({ response });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
      next(err);
    });
}

// add new Opportunity
export async function AddOpportunity(req, res) {
  try {
    const model = new Model({
      type: req.body.type,
      capacity: req.body.capacity,
      location: req.body.location,
      deadline_date: req.body.deadline_date,
      startup_date: req.body.startup_date,
      goals: req.body.goals,
      target_audience: req.body.target_audience,
      partners: req.body.partners,
      description: req.body.description,
      status: req.body.status,
      agenda: req.body.agenda,
      title: req.body.title,
    });

    const ad = await model.save();
    console.log(ad);
    return res.status(201).send(ad);
  } catch (err) {
    res.status(500).send({ err });
  }
}

//update Opportunity

export const updateOpportunity = async (req, res) => {
  try {
    const opportunity = await Model.findById(req.params.id);
    if (!opportunity) {
      return res.status(404).json({ message: "opportunity not found" });
    }
    opportunity.type = req.body.type;
    opportunity.capacity = req.body.capacity;
    opportunity.location = req.body.location;
    opportunity.deadline_date = req.body.deadline_date;
    opportunity.startup_date = req.body.startup_date;
    opportunity.goals = req.body.goals;
    opportunity.target_audience = req.body.target_audience;
    opportunity.partners = req.body.partners;
    opportunity.description = req.body.description;
    opportunity.status = req.body.status;
    opportunity.agenda = req.body.agenda;
    opportunity.title = req.body.title;

    const updatedopportunity = await opportunity.save();
    res.json(updatedopportunity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//delete an Opportunity by id
export function deleteOpportunity(req, res, next) {
  let { id } = req.params;
  Model.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Opportunity not found" });
      } else {
        res.status(200).send({ success: true, message: "delete successfully" });
      }
    })

    .catch((err) => {
      res.status(500).send({ message: "error deleting Opportunity" });
    });
}

const OpportunityController = {
  getAllOpportunity,
  getOpportunityByID,
  AddOpportunity,
  updateOpportunity,
  deleteOpportunity,
};
export default OpportunityController;
