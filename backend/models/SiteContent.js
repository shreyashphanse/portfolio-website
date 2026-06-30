import mongoose from "mongoose";

const siteContentSchema = new mongoose.Schema({
  heroTitle: String,
  heroSubtitle: String,
  heroDescription: String,

  aboutText: String,

  techStack: {
    type: mongoose.Schema.Types.Mixed,
    default: {
      Frontend: [],
      Backend: [],
      Database: [],
      Languages: [],
      Tools: [],
    },
  },
  email: String,
  github: String,
  linkedin: String,
});

const SiteContent = mongoose.model("SiteContent", siteContentSchema);

export default SiteContent;
