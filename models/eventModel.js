import mongoose from "mongoose";
const { Schema, model } = mongoose;

const eventSchema = new Schema(
  {
    deadline_dateTime: {
      type: Date,
      required: true,
    },
    event_dateTime: [
      {
        start: {
          type: Date,
          required: true,
        },
        end: {
          type: Date,
          required: true,
        },
      },
    ],
    number_of_hours: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    objectives: {
      type: String,
      required: true,
    },
    speaker_name: {
      type: String,
      required: true,
    },
    speaker_title: {
      type: String,
      required: true,
    },
    target_audience: [
      {
        type: String,
        enum: [
          "Open to the public",
          "LU Academic Staff",
          "LU Administrative Staff",
          "LU Students",
          "LU graduates",
        ],
      },
    ],
    target_faculties: [
      {
        faculty: {
          type: String,
          required: true,
        },
        branch: {
          type: String,
          required: true,
        },
      },
    ],
    image: {
      type: String,
      required: true,
    },
    pdf: {
      type: String,
      // required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    goals: [
      {
        type: String,
        enum: [
          "No poverty",
          "Zero hunger",
          "Good health",
          "Education",
          "Gender equality",
          "Clean water",
          "Clean energy",
          "Economic growth",
          "Industry and infrastructure",
          "No inequality",
          "Sustainability",
          "Responsible consumption",
          "Climate action",
          "Life underwater",
          "Life on land",
          "Peace & justice",
          "Partnership",
        ],
      },
    ],
    partners: [
      {
        name: String,
        website: String,
      },
    ],
    status: {
      type: String,
      enum: ["open", "closed", "cancelled"],
      required: true,
    },
    type: {
      type: String,
      enum: ["webinar", "workshop"],
      required: true,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    waiting_list: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    collection: "Events",
    timestamps: true,
  }
);

const Event = model("Event", eventSchema);
export default Event;
