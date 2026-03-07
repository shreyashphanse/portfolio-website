import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["project", "achievement"],
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

    techStack: {
      type: [String],
      default: [],
    },

    githubLink: {
      type: String,
      default: "",
    },

    liveLink: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    highlight: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["completed", "ongoing"],
      default: "completed",
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model("Post", postSchema);

export default Post;
