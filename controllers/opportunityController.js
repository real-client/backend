import Opportunity from "../models/opportunityModel.js";
import fs from "fs";

//get all the Opportunity
export async function getAllOpportunity(req, res, next) {
  try {
    const opportunities = await Opportunity.find().exec();
    res.status(200).json({ success: true, opportunities });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

//get Opportunity by id
export function getOpportunityByID(req, res, next) {
  const { id } = req.params;
  Opportunity.findOne({ _id: id })
    .then((opportunity) => {
      if (!opportunity) {
        return res
          .status(404)
          .json({ success: false, message: "Opportunity not found" });
      }
      res.status(200).json({ success: true, opportunity });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
      next(err);
    });
}
// get paginated opportunities sorted by date
export const getPaginatedOpportunities = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page number (default: 1)
    const limit = parseInt(req.query.limit) || 10; // Number of events per page (default: 10)
    const sortBy = req.query.sortBy || "  startup_date"; // Sort by field
    const sortOrder = req.query.sortOrder || "desc"; // Sort order

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;

    const totalOpportunities = await Opportunity.countDocuments({});
    const totalPages = Math.ceil(totalOpportunities / limit);

    const opportunities = await Opportunity.find({})
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).send({
      success: true,
      page,
      limit,
      totalPages,
      opportunities,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get paginated opportunities populated with users data
export const getPaginatedPopulatedOpportunities = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page number (default: 1)
    const limit = parseInt(req.query.limit) || 10; // Number of events per page (default: 10)
    const sortBy = req.query.sortBy || "  startup_date"; // Sort by field
    const sortOrder = req.query.sortOrder || "desc"; // Sort order

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;

    const totalOpportunities = await Opportunity.countDocuments({});
    const totalPages = Math.ceil(totalOpportunities / limit);

    const opportunities = await Opportunity.find({})
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("users");

    res.status(200).send({
      success: true,
      page,
      limit,
      totalPages,
      opportunities,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// add new Opportunity
export const createOpportunity = async (req, res) => {
  try {
    req.body.users = [];
    const opportunity = new Opportunity(req.body);
    const createdOpportunity = await opportunity.save();
    res.status(200).json({ success: true, message: createdOpportunity });
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

//update Opportunity
export const updateOpportunity = async (req, res) => {
  try {
    const opportunityId = req.params.id;
    const updatedOpportunity = req.body;
    const opportunity = await Opportunity.findById(opportunityId);
    if (!opportunity) {
      return res.status(404).json({ message: "opportunity not found" });
    }
    // delete old image if new one is uploaded
    if (req.files && req.files.image) {
      const oldImagePath = opportunity.image;
      if (oldImagePath) {
        fs.unlinkSync(oldImagePath, (err) => {
          if (err) throw err;
          console.log(`Successfully deleted image ${opportunity.image}`);
        });
      }
      updatedOpportunity.image = req.files.image[0].path;
    }

    // delete old pdf if new one is uploaded
    if (req.files && req.files.pdf) {
      const oldPdfPath = opportunity.pdf;
      if (oldPdfPath) {
        fs.unlinkSync(oldPdfPath, (err) => {
          if (err) throw err;
          console.log(`Successfully deleted pdf ${opportunity.pdf}`);
        });
      }
      updatedOpportunity.pdf = req.files.pdf[0].path;
    }
    const updatedOpp = await Opportunity.findByIdAndUpdate(
      opportunityId,
      updatedOpportunity,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({ success: true, message: updatedOpp });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//delete an Opportunity by id
export const deleteOpportunity = async (req, res) => {
  const { id } = req.params;
  try {
    const opportunity = await Opportunity.findByIdAndDelete(id);
    if (!opportunity) {
      return res.status(404).send({ error: "Opportunity  not found" });
    }
    if (opportunity.image !== null && opportunity.image !== undefined) {
      try {
        fs.unlinkSync(`${opportunity.image}`);
        console.log(`Successfully deleted image ${opportunity.image}`);
      } catch (error) {
        console.error(error);
      }
    }
    if (opportunity.pdf !== null && opportunity.pdf !== undefined) {
      try {
        fs.unlinkSync(`${opportunity.pdf}`);
        console.log(`Successfully deleted pdf ${opportunity.pdf}`);
      } catch (error) {
        console.error(error);
      }
    }
    res.send({ message: "Opportunity deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};
