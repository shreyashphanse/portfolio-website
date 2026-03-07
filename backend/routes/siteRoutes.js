import express from "express";
import {
  getSiteContent,
  updateSiteContent,
} from "../controllers/siteController.js";

import { checkPassword } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getSiteContent);

router.put("/", checkPassword, updateSiteContent);

export default router;
