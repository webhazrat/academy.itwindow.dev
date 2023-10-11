import connectDB from "@/src/lib/connect";
import { multerStorage, uId, unlinkPhoto } from "@/src/lib/helpers";
import loginAuthMiddleware from "@/src/middleware/loginAuthMiddleware";
import userModel from "@/src/models/userModel";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const session = await loginAuthMiddleware(req, res);
      const upload = multerStorage(uId());
      upload.single("file")(req, {}, async (error) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }
        await connectDB();
        const user = await userModel.findById(session.user._id);
        if (user.image) {
          unlinkPhoto(user.image);
        }
        await userModel.updateOne(
          { _id: session.user._id },
          { $set: { image: req.file.filename } }
        );
        res.status(200).json({ message: "প্রোফাইল ফটো সফলভাবে আপলোড হয়েছে।" });
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
