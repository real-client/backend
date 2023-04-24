import express from "express";
import Event from "../models/eventModel.js";
import fs from "fs";
import path from "path";

//create a new event
export const createEvent = async (req, res) => {
  try {
    console.log("Creating");
    const newEvent = new Event(req.body);
    const category = await newEvent.save();
    res.status(200).json({ success: true, message: category });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((val) => {
        console.log("hey");
        val.message;
      });
      res.status(400).json({ message: errors });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
};

// retrieve all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).send({ success: true, message: events });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// retrieve a specific event by ID
export const getEventById = async (req, res, next) => {
  try {
    console.log("hey");
    const event = await Event.findById(req.params.id);
    console.log(event);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).send({ success: true, message: event });
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update a specific event by ID
// export const updateEventById = async (req, res) => {
//   try {
//     const {
//       title,
//       description,
//       objectives,
//       speaker_name,
//       speaker_title,
//       target_audience,
//       target_faculties,
//       poster_pic,
//       pdf,
//       capacity,
//       category,
//       user,
//       status,
//       deadline_date,
//       deadline_time,
//       event_date,
//       event_time,
//     } = req.body;

//     if (title) {
//       res.event.title = title;
//     }
//     if (description) {
//       res.event.description = description;
//     }
//     if (objectives) {
//       res.event.objectives = objectives;
//     }
//     if (speaker_name) {
//       res.event.speaker_name = speaker_name;
//     }
//     if (speaker_title) {
//       res.event.speaker_title = speaker_title;
//     }
//     if (target_audience) {
//       res.event.target_audience = target_audience;
//     }
//     if (target_faculties) {
//       res.event.target_faculties = target_faculties;
//     }
//     if (poster_pic) {
//       res.event.poster_pic = poster_pic;
//     }
//     if (pdf) {
//       res.event.pdf = pdf;
//     }
//     if (capacity) {
//       res.event.capacity = capacity;
//     }
//     if (category) {
//       res.event.category = category;
//     }
//     if (user) {
//       res.event.user = user;
//     }
//     if (status) {
//       res.event.status = status;
//     }
//     if (deadline_date) {
//       res.event.deadline_date = deadline_date;
//     }
//     if (deadline_time) {
//       res.event.deadline_time = deadline_time;
//     }
//     if (event_date) {
//       res.event.event_date = event_date;
//     }
//     if (event_time) {
//       res.event.event_time = event_time;
//     }

//     const updatedEvent = await res.event.save();
//     res.json(updatedEvent);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

export const updateEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const updatedEvent = req.body;

    const event = await Event.findById(eventId);

    // delete old image if new one is uploaded
    if (req.files && req.files['image']) {
      const oldImagePath = event.image;
      if (oldImagePath) {
        fs.unlinkSync(oldImagePath);
      }
      updatedEvent.image = req.files['image'][0].path;
    }

    // delete old pdf if new one is uploaded
    if (req.files && req.files['pdf']) {
      const oldPdfPath = event.pdf;
      if (oldPdfPath) {
        fs.unlinkSync(oldPdfPath);
      }
      updatedEvent.pdf = req.files['pdf'][0].path;
    }

    const updated = await Event.findByIdAndUpdate(eventId, updatedEvent, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).send({ error: "Event not found" });
    }
    if (event !== null && event !== undefined) {
      fs.unlinkSync(`${event.image}`, (err) => {
        if (err) throw err;
        console.log(`Successfully deleted image ${event.image}`);
      });
      fs.unlinkSync(`${event.pdf}`, (err) => {
        if (err) throw err;
        console.log(`Successfully deleted pdf ${event.pdf}`);
      });
    }
    const imagePath = event.image;
    const pdfPath = event.pdf;

    res.send({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};
