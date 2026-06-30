import express from "express";
import {
  getSiteContent,
  updateSiteContent,
} from "../controllers/siteController.js";

import { checkPassword } from "../middleware/authMiddleware.js";
import uploadResume from "../middleware/uploadResume.js";

const router = express.Router();

router.get("/", getSiteContent);

router.put("/", checkPassword, updateSiteContent);

router.post(
  "/resume",
  checkPassword,
  uploadResume.single("resume"),
  (req, res) => {
    res.json({
      message: "Resume uploaded successfully",
    });
  },
);

export default router;
