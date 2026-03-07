import SiteContent from "../models/SiteContent.js";

export const getSiteContent = async (req, res) => {
  try {
    const content = await SiteContent.findOne();

    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSiteContent = async (req, res) => {
  try {
    const content = await SiteContent.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });

    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
