import express from "express";
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { checkPassword } from "../middleware/authMiddleware.js";
import fs from "fs";
import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
const router = express.Router();
const uploadDir = "uploads";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
/* GET all posts */
router.get("/", getPosts);

/* CREATE new post */
router.post("/", checkPassword, upload.single("image"), createPost);

/* UPDATE post */
router.put("/:id", checkPassword, updatePost);

/* DELETE post */
router.delete("/:id", checkPassword, deletePost);

export default router;
