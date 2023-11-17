import connectDB from "@/src/lib/connect";
import { ParticipantSchema } from "@/src/lib/validation";
import participantModel from "@/src/models/participantModel";
import { z } from "zod";

// create a participant [path: seminar]
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      ParticipantSchema.parse(req.body);
      await connectDB();
      const participantExist = await participantModel.countDocuments({
        seminarId: req.body.seminarId,
        phone: req.body.phone,
      });
      if (participantExist) {
        return res.status(400).json({
          title: "দুঃখিত!",
          message: "এই সেমিনারে পূর্বেই রেজিস্ট্রেশন করা হয়েছে",
        });
      }
      await participantModel.create(req.body);
      res.status(200).json({
        title: "সফল!",
        message: "সফলভাবে রেজিস্ট্রেশন সম্পন্ন হয়েছে",
      });
    } catch (error) {
      console.log({ participantCreateCatch: error });
      // ParticipantSchema zod validation error
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
