import { SeminarSchema } from "@/src/lib/validation";
import { checkAdmin } from "@/src/middleware/serverAuth";
import seminarModel from "@/src/models/seminarModel";

// update a seminar [path: dashboard/seminars]
export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const session = await checkAdmin(req, res);
      const { id } = req.query;
      SeminarSchema.parse(req.body);
      await seminarModel.findByIdAndUpdate(id, req.body);
      res.status(200).json({
        title: "সফল!",
        message: "সেমিনার সফলভাবে আপডেট হয়েছে",
      });
    } catch (error) {
      console.log({ seminarUpdateCatch: error });
      // SeminarSchema zod validation error
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          errors: error.errors.map((err) => ({
            field: err.path[0],
            message: err.message,
          })),
        });
      } else {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  } else {
    res.status(405).json({ message: "Request method not allowed" });
  }
}
