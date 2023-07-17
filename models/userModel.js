import { Schema, model } from "mongoose";
import validator from "validator";

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: [true, "Please enter your first name!"],
      trim: true,
    },

    last_name: {
      type: String,
      required: [true, "Please enter your last name!"],
      trim: true,
    },

    father_name: {
      type: String,
      required: [true, "Please enter your father's name!"],
      trim: true,
    },

    title: {
      type: String,
      // enum: ["Mr", "Miss", "Ms", "Mrs", "Dr", "Prof", "Eng", "Student", "Other"],
      required: true,
      trim: true,
    },

    role: {
      type: String,
      enum: [
        "LU Student",
        "LU Alumni",
        "LU Academic Staff",
        "LU Administrative Staff",
        "Non LU Member",
      ],
      required: false,
      trim: true,
    },

    date_of_birth: {
      type: Date,
      required: true,
      min: "1900-01-01",
      max: new Date(),
    },

    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: [true, "Please select your gender!"],
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (value) => validator.isMobilePhone(value),
        message:
          "Please provide a valid phone number (include country code), ex: 009610000000",
      },
    },

    nationality: {
      type: String,
      required: true,
      trim: true,
    },

    residence: {
      type: String,
      required: true,
      trim: true,
    },

    student_id: {
      type: String,
      required: [
        true,
        "Please provide a valid student ID number or staff ID number",
      ],
      trim: true,
      default: "0000",
    },

    special_needs: {
      type: Boolean,
      required: true,
    },

    lu_email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: false,
      validate: {
        validator: (value) =>
          validator.isEmail(value) && value.endsWith("@ul.edu.lb"),
        message: "Please provide a valid email at UL.EDU.LB",
      },
    },

    active_email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Please provide a valid email",
      },
    },

    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
      select: false,
    },

    faculty: {
      type: String,
      enum: [
        "NOT MEMBER AT THE LEBANESE UNIVERSITY",
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
      enum: [
        "NOT MEMBER AT THE LEBANESE UNIVERSITY",
        "Branch 1",
        "Branch 2",
        "Branch 3",
        "Branch 4",
        "Branch 5",
      ],
      required: true,
      trim: true,
    },

    privacy_consent: {
      type: Boolean,
      default: false,
      required: true,
      validate: {
        validator: (value) => value === true,
        message: "You must provide consent for data storage and sharing.",
      },
    },

    privacy_policy_agreement: {
      type: Boolean,
      default: false,
      required: true,
      validate: {
        validator: (value) => value === true,
        message: "You must agree to the privacy policy.",
      },
    },

    verified: {
      type: Date,
    },

    events: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
        required: false,
      },
    ],

    opportunities: [
      {
        type: Schema.Types.ObjectId,
        ref: "Opportunity",
        required: false,
      },
    ],
  },
  {
    collection: "Users",
    timestamps: true,
  }
);

const User = model("User", userSchema);
export default User;
