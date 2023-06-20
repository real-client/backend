import mongoose from "mongoose";
const { Schema, model } = mongoose;

const vacancySchema = new Schema(
  {
    jobReference: {
      type: String,
      required: true,
    },
    jobVacancy: {
      type: String,
      required: true,
    },
    jobLocation: {
      type: String,
      required: true,
    },
    experienceNeeded: {
      type: String,
      enum: [
        "Not applicable",
        "0-2 years",
        "2-5 years",
        "above 5 years",
        "above 10 years",
      ],
      required: true,
    },
    otherRequirements: {
      type: String,
      required: false,
    },
  },
  {
    collection: "Vacancies",
    timestamps: true,
  }
);

const Vacancy = model("Vacancy", vacancySchema);
export default Vacancy;
