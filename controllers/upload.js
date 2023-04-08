import { supabase } from "../utils/init.js";
import { randomBytes } from "crypto";

const uploadImageController = async (req, res, next) => {
  const file = req.file;
  if (!file) {
    return res.status(422).json({ message: "Invalid file format" });
  }
  const image = file?.buffer;
  const randomVal = randomBytes(8).toString("hex");
  const fileName = `${Date.now()}_${randomVal}.${
    req.file.originalname.split(".")[1]
  }`;

  try {
    const { data, error } = await supabase.storage
      .from(`${process.env.BUCKET}`)
      .upload(
        `public/${fileName}   
        `,
        image,
        {
          cacheControl: "3600",
          upsert: true,
          contentType: "image/png",
        }
      );
    // console.log(data, supabaseError);
    if (error) {
      console.error(error);
      res.status(500).json({ message: "Error uploading file" });
    } else {
      const url = `${process.env.CLIENT_URL}${data.path.split(" ")[0]}`;

      res
        .status(200)
        .json({ message: "File uploaded successfully", imageUrl: url });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { uploadImageController };
