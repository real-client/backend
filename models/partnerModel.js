import { Schema, model } from "mongoose";

const partnerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: [true, "Name already exists"],
    },
    image: {
      type: String,
      required: true,
    },
    website_link: {
      type: String,
      required: true,
    },
  },
  {
    collection: "Partners",
    timestamps: true,
  }
);

const Partner = model("Partner", partnerSchema);

export default Partner;
