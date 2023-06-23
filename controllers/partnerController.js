import Partner from "../models/partnerModel.js";
import fs from "fs";

//get all the partner
export const getAllPartner = async (req, res, next) => {
  try {
    const partners = await Partner.find().exec();
    res.status(200).send({ success: true, message: partners });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

//get partner by id
export const getPartnerByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const partner = await Partner.findOne({ _id: id });

    if (!res) {
      return res.status(404).send({ message: "Partner not found" });
    }

    res.status(200).send({ success: true, message: partner });
  } catch (err) {
    res.status(500).send({ message: err.message });
    next(err);
  }
};

// add new partner
export const createPartner = async (req, res) => {
  try {
    const { name, image, website_link } = req.body;

    const partner = new Partner({
      name,
      image,
      website_link,
    });

    const savedPartner = await partner.save();

    res.status(201).json({ success: true, savedPartner });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((val) => {
        return val.message;
      });
      res.status(400).json({ message: errors });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
};

//update partner
export const updatePartner = async (req, res) => {
  try {
    const partnerId = req.params.id;
    const updatedData = req.body;
    const partner = await Partner.findById(partnerId);

    if (!partner) {
      return res.status(404).json({ error: "Partner not found" });
    }

    // Delete previous image if a new image is provided
    if (updatedData.image && partner.image !== updatedData.image) {
      if (partner.image) {
        // Delete the previous image file
        fs.unlinkSync(partner.image);
      }
    }

    // Update partner data
    Object.assign(partner, updatedData);

    // Save the updated partner
    await partner.save();

    return res.json(partner);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//delete an partner by id
export const deletePartner = async (req, res) => {
  try {
    const partnerId = req.params.id;
    const partner = await Partner.findById(partnerId);

    if (!partner) {
      return res.status(404).json({ message: "Partner not found" });
    }

    if (partner.logo) {
      fs.unlinkSync(partner.logo);
    }

    await Partner.findByIdAndDelete(partnerId);
    res
      .status(200)
      .json({ success: true, message: "Partner deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
