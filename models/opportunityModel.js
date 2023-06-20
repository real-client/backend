import mongoose from "mongoose";
const { Schema, model } = mongoose;

const opportunitySchema = new Schema(
  {
    deadline_date: {
      type: Date,
      required: true,
    },
    startup_date: {
      type: Date,
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
    opportunity_link: {
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
    },
    pdf: {
      type: String,
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
    location: {
      type: String,
      required: true,
    },
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
      enum: ["opportunity", "competition"],
      required: true,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    collection: "Opportunities",
    timestamps: true,
  }
);

const Opportunity = model("Opportunity", opportunitySchema);
export default Opportunity;
