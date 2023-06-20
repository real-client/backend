import Event from "../models/eventModel.js";
import fs from "fs";
import path from "path";

//create a new event
export const createEvent = async (req, res) => {
  try {
    req.body.users = [];
    req.body.waiting_list = [];
    const newEvent = new Event(req.body);
    const category = await newEvent.save();
    res.status(200).json({ success: true, message: category });
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

// retrieve all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json({ success: true, events });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//get paginated events sorted by dateTime
export const getPaginatedEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page number (default: 1)
    const limit = parseInt(req.query.limit) || 10; // Number of events per page (default: 10)
    const sortBy = req.query.sortBy || "event_dateTime.start"; // Sort by field (default: event_dateTime.start)
    const sortOrder = req.query.sortOrder || "desc"; // Sort order (default: descending)

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;

    const totalEvents = await Event.countDocuments({});
    const totalPages = Math.ceil(totalEvents / limit);

    const events = await Event.find({})
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).send({
      success: true,
      page,
      limit,
      totalPages,
      events,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get paginated opportunities populated with users data
export const getPaginatedPopulatedEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page number (default: 1)
    const limit = parseInt(req.query.limit) || 10; // Number of events per page (default: 10)
    const sortBy = req.query.sortBy || "event_dateTime.start"; // Sort by field (default: event_dateTime.start)
    const sortOrder = req.query.sortOrder || "desc"; // Sort order (default: descending)

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;

    const totalEvents = await Event.countDocuments({});
    const totalPages = Math.ceil(totalEvents / limit);

    const events = await Event.find({})
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("users waiting_list");

    res.status(200).send({
      success: true,
      page,
      limit,
      totalPages,
      events,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// retrieve first 3 latest events
export const getLatestEvents = async (req, res) => {
  try {
    const events = await Event.find({})
      .sort({ "event_dateTime.start": -1 })
      .limit(3);
    res.status(200).send({ success: true, message: events });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// retrieve a specific event by ID
export const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    res.status(200).json({ success: true, event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// update a specific event by ID
export const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const updatedEvent = req.body;

    const event = await Event.findById(eventId);

    // delete old image if new one is uploaded
    if (req.files && req.files.image) {
      const oldImagePath = event.image;
      if (oldImagePath) {
        fs.unlinkSync(oldImagePath, (err) => {
          if (err) throw err;
          console.log(`Successfully deleted image ${event.image}`);
        });
      }
      updatedEvent.image = req.files.image[0].path;
    }

    // delete old pdf if new one is uploaded
    if (req.files && req.files.pdf) {
      const oldPdfPath = event.pdf;
      if (oldPdfPath) {
        fs.unlinkSync(oldPdfPath, (err) => {
          if (err) throw err;
          console.log(`Successfully deleted pdf ${event.pdf}`);
        });
      }
      updatedEvent.pdf = req.files.pdf[0].path;
    }

    const updated = await Event.findByIdAndUpdate(eventId, updatedEvent, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, message: updated });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// delete a specific event by ID
export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).send({ error: "Event not found" });
    }
    if (event.image !== null && event.image !== undefined) {
      try {
        fs.unlinkSync(`${event.image}`);
        console.log(`Successfully deleted image ${event.image}`);
      } catch (error) {
        console.error(error);
      }
    }
    if (event.pdf !== null && event.pdf !== undefined) {
      try {
        fs.unlinkSync(`${event.pdf}`);
        console.log(`Successfully deleted pdf ${event.pdf}`);
      } catch (error) {
        console.error(error);
      }
    }
    res.send({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};
