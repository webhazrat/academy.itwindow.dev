import connectDB from "@/src/lib/connect";
import { multerStorage, uId, unlinkPhoto } from "@/src/lib/helpers";
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
      const upload = await multerStorage(uId(), destination);
      upload.single("file")(req, {}, async (error) => {
        if (error) {
          throw new Error(error);
        }
        const { id } = req.body;
        await connectDB();
        // previous image name find from db
        const course = await courseModel.findOne({ _id: id }).select("image");
        // previous image unlink
        unlinkPhoto(course.image, destination);
        // new image name update
        await courseModel.updateOne(
          { _id: id },
          { $set: { image: req.file.filename } }
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
