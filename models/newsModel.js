import mongoose from "mongoose";
const { Schema, model } = mongoose;

const newsSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    article: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
  },
  {
    collection: "News",
    timestamps: true,
  }
);

const News = model("News", newsSchema);

export default News;
