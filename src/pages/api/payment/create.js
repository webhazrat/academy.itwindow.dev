import connectDB from "@/src/lib/connect";
import { PaymentSchema } from "@/src/lib/validation";
import { checkEnroll } from "@/src/middleware/serverAuth";
import paymentModel from "@/src/models/paymentModel";
import { z } from "zod";

export default async function hanlder(req, res) {
  if (req.method === "POST") {
    try {
      let { enrollId, paymentMethod, transactionId } = req.body;
      const enrolls = await checkEnroll(req, res, enrollId);
      PaymentSchema.parse(req.body);
      if (paymentMethod === "Cash") {
        transactionId = "";
      }
      await connectDB();
      await paymentModel.create(req.body);
      res.status(200).json({
        status: 200,
        title: "সফল!",
        message: "পেমেন্ট রিকুয়েস্ট সফলভাবে সংযুক্ত হয়েছে",
      });
    } catch (error) {
      console.log({ paymentCreateCatch: error });
      // PaymentSchema zodError
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
    res
      .status(405)
      .json({ status: 405, message: "Request method not allowed" });
  }
}
