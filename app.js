import express from "express";
import cors from "cors";
import bodParser from "body-parser";
import multer from "multer";
import { uploadImage, deleteImage, updateImage } from "./routes/routes.js";
import { initializeSupabase } from "./utils/init.js";
import * as dotenv from "dotenv";
import helmet from "helmet";
dotenv.config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(bodParser.json());

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
app.use(multer({ fileFilter: fileFilter }).single("image"));

app.use((req, res, next) => {
  const isConnected = initializeSupabase();
  if (!isConnected) {
    return next(new Error("Unable to initialize supabase"));
  }
  next();
});
app.use(uploadImage);
app.use(updateImage);
app.use(deleteImage);
app.use((errors, req, res, next) => {
  console.log(errors);
  res.status(500).json({ errors });
});
const PORT = process.env.PORT;
app.listen(PORT || 3000, () =>
  console.log(`Server listening on port ${PORT || 3000}`)
);
