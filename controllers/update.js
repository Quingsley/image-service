import { supabase } from "../utils/init.js";
const updateImageController = async (req, res, next) => {
  const { originalFileName } = req.params;
  const file = req.file;
  if (!file) {
    return res.status(422).json({ message: "Invalid file format" });
  }
  const image = file?.buffer;

  try {
    const { data, error } = await supabase.storage
      .from(`${process.env.BUCKET}`)
      .update(`public/${originalFileName}`, image, {
        cacheControl: "3600",
        upsert: true,
        contentType: "image/png",
      });
    if (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating file" });
    } else {
      const url = `${process.env.CLIENT_URL}${data.path.split(" ")[0]}`;
      res
        .status(200)
        .json({ message: "File updated successfully", imageUrl: url });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { updateImageController };
