import mongoose from "mongoose";
const { Schema, model } = mongoose;

const eventSchema = new Schema({
  deadline_dateTime: {
    type: Date,
    required: true,
  },
  event_dateTime: {
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
  target_audience: {
    type: String,
    required: true,
  },
  target_faculties: {
    type: String,
    required: true,
  },
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
  category: {
    type: String,
    required: true,
  },
  goals: {
    type: String,
    required: true,
  },
  users: [
  //   {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  //   // required: true,
  // }
],
  status: {
    type: String,
    enum: ["open", "closed", "canceled"],
    required: true,
  },
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
