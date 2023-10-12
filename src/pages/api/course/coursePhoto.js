import { multerStorage, uId } from "@/src/lib/helpers";
import adminAuthMiddleware from "@/src/middleware/adminAuthMiddleware";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const destination = "public/courses";
    try {
      const session = await adminAuthMiddleware(req, res);
      const upload = await multerStorage(uId(), destination);
      upload.single("file")(req, {}, async (error) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }
        res.status(200).json({ status: 200, data: req.file.filename });
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          errors: error.errors.map((err) => ({
            field: err.path[0],
            message: err.message,
          })),
        });
      } else {
        console.log({ coursePhotoCatch: error });
        res.status(500).json({ status: 500, message: "Internal server error" });
      }
    }
  } else {
    res
      .status(405)
      .json({ status: 405, message: "Request method not allowed" });
  }
}
