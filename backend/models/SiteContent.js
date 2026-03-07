import mongoose from "mongoose";

const siteContentSchema = new mongoose.Schema({
  heroTitle: String,
  heroSubtitle: String,
  heroDescription: String,

  aboutText: String,

  techStack: [String],

  email: String,
  github: String,
  linkedin: String,
});

const SiteContent = mongoose.model("SiteContent", siteContentSchema);

export default SiteContent;
