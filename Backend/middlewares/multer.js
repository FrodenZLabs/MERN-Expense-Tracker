import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  filename: (request, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Filter only image types
const fileFilter = (request, file, cb) => {
  const allowedTypes = /jpeg|png|jpg/;
  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowedTypes.test(file.mimeType);

  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file types. Only JPEG, PNG, JPG files are allowed."),
      false
    );
  }
};

const upload = multer({
  storage: storage,
  limits: { fieldSize: 10 * 1024 * 1024 }, // 10MB max file size
  fileFilter: fileFilter,
});

export default upload;
