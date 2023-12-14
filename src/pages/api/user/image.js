import connectDB from "@/src/lib/connect";
import { multerStorage, unlinkPhoto } from "@/src/lib/helpers";
import { checkLogin } from "@/src/middleware/serverAuth";
import userModel from "@/src/models/userModel";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const destination = "public/uploads";
    try {
      const session = await checkLogin(req, res);
      const upload = await multerStorage(destination);
      upload.single("file")(req, {}, async (error) => {
        if (error) {
          throw new Error(error);
        }
        await connectDB();
        const user = await userModel.findById(session.user._id).select("image");
        if (user.image) {
          unlinkPhoto(user.image, destination);
        }
        await userModel.updateOne(
          { _id: session.user._id },
          { $set: { image: req.file.filename } }
        );
        res.status(200).json({
          title: "সফল!",
          message: "প্রোফাইল ফটো সফলভাবে আপলোড হয়েছে।",
        });
      });
    } catch (error) {
      console.log({ profilePhotoCatch: error });
      res.status(500).json({ status: 500, message: "Internal server error" });
    }
  } else {
    res
      .status(405)
      .json({ status: 405, message: "Request method not allowed" });
  }
}
