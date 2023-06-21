import { Schema, model } from "mongoose";

const teamSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    title: [
      {
        type: String,
      },
    ],

    role: {
      type: String,
      enum: ["director", "co-founder", "main founder", "staff"],
      required: true,
    },

    starting_date: {
      type: Date,
      required: true,
    },
    ending_date: {
      type: Date,
      default: null,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    contact: {
      email: { type: String },
      phone: { type: String },
      socialMedia: {
        twitter: { type: String },
        instagram: { type: String },
        facebook: { type: String },
        linkedin: { type: String },
      },
    },
  },
  {
    collection: "Teams",
    timestamps: true,
  }
);

const Team = model("Team", teamSchema);
export default Team;
