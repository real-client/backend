import { Schema, model } from "mongoose";import { Schema, model } from "mongoose";

const volunteerSchema = new Schema(
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

    faculty: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
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
    collection: "Volunteers",
    timestamps: true,
  }
);

const Volunteer = model("Volunteer", volunteerSchema);
export default Volunteer;