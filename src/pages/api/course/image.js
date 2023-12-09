import connectDB from "@/src/lib/connect";
import { multerStorage, unlinkPhoto } from "@/src/lib/helpers";
import { checkAdmin } from "@/src/middleware/serverAuth";
import courseModel from "@/src/models/courseModel";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const destination = "public/courses";
    try {
      const session = await checkAdmin(req, res);

      const upload = await multerStorage(destination);
      upload.any()(req, {}, async (error) => {
        if (error) {
          throw new Error(error);
        }
        await connectDB();
        const { id } = req.body;
        // previous image name find from db
        const course = await courseModel
          .findOne({ _id: id })
          .select("icon image");

        const updateData = {};
        if (req.files.length > 0) {
          req.files.map((file) => {
            if (file.fieldname === "icon") {
              unlinkPhoto(course.icon, destination);
              updateData.icon = file.filename;
            } else {
              unlinkPhoto(course.image, destination);
              updateData.image = file.filename;
            }
          });
        }

        await courseModel.updateOne(
          { _id: id },
          {
            $set: updateData,
          }
        );
        return res.status(200).json({
          status: 200,
          title: "সফল!",
          message: "কোর্স ইমেজ সফলভাবে আপলোড হয়েছে",
        });
      });
    } catch (error) {
      console.log({ coursePhotoCatch: error });
      res.status(500).json({ status: 500, message: "Internal server error" });
    }
  } else {
    res
      .status(405)
      .json({ status: 405, message: "Request method not allowed" });
  }
}

const uploadPhoto = () => {};
