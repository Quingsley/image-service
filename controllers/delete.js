import { supabase } from "../utils/init.js";
const deleteImageController = async (req, res, next) => {
  const { fileName } = req.body;
  try {
    const { data, error } = await supabase.storage
      .from(`${process.env.BUCKET}`)
      .remove([`public/${fileName}`]);

    if (error || error === null) {
      res.status(500).json({
        message: "Unable to delete Image",
      });
    } else {
      res
        .status(200)
        .json({ message: "Image Deleted Successfully", data: data });
    }
  } catch (error) {
    next(error);
  }
};

export { deleteImageController };
