import { Router } from "express";
import { uploadImageController } from "../controllers/upload.js";
import { deleteImageController } from "../controllers/delete.js";
import { updateImageController } from "../controllers/update.js";

const router = Router();

const uploadImage = router.post("/upload", uploadImageController);
const updateImage = router.post(
  "/update/:originalFileName",
  updateImageController
);
const deleteImage = router.post("/delete", deleteImageController);

export { uploadImage, deleteImage, updateImage };
