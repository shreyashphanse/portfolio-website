import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads/");
  },

  filename: (_, file, cb) => {
    cb(null, "resume" + path.extname(file.originalname));
  },
});

const uploadResume = multer({
  storage,
});

export default uploadResume;
