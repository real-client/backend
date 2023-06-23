import { Schema, model } from "mongoose";
import validator from "validator";

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
      enum: [
        "Faculty of Pedagogy",
        "Faculty of Fine Arts and Architecture",
        "Faculty of Law and Political and Administrative Sciences",
        "Faculty of Letters and Human Sciences",
        "Faculty of Tourism and Hospitality Management",
        "Faculty of Economics and Business Administration",
        "Institute of Social Sciences",
        "Faculty of Information",
        "Faculty of Science",
        "Faculty of Public Health",
        "Faculty of Agronomy",
        "Faculty of Pharmacy",
        "Faculty of Medical Sciences",
        "Faculty of Engineering",
        "Faculty of Dental Medicine",
        "Faculty of Technology",
        "Higher Institute of Applied Economic Sciences",
        "Doctoral School of Literature, Humanities & Social Sciences",
        "Doctoral School of Science and Technology",
        "Doctoral School of Law, Political, Administrative and Economic Sciences",
      ],
      required: true,
    },

    branch: {
      type: String,
      enum: ["Branch 1", "Branch 2", "Branch 3", "Branch 4", "Branch 5"],
      required: true,
      trim: true,
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
      email: {
        type: String,
        validate: {
          validator: validator.isEmail,
          message: "Invalid email address",
        },
      },

      phone: {
        type: String,
        validate: {
          validator: function (phone) {
            return validator.isMobilePhone(phone, "any");
          },
          message: "Invalid phone number",
        },
      },

      socialMedia: {
        twitter: { type: String },
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
