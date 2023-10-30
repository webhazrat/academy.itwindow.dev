import connectDB from "@/src/lib/connect";
import { PaymentSchema } from "@/src/lib/validation";
import { checkAdmin } from "@/src/middleware/serverAuth";
import accountModel from "@/src/models/paymentModel";
import { z } from "zod";

export default async function hanlder(req, res) {
  if (req.method === "PUT") {
    const { id } = req.query;
    try {
      const session = await checkAdmin(req, res);
      PaymentSchema.parse(req.body);
      let { paymentMethod, transactionId } = req.body;
      if (paymentMethod === "Cash") {
        transactionId = "";
      }
      await connectDB();
      await accountModel.updateOne({ _id: id }, { $set: req.body });
      res.status(200).json({
        status: 200,
        title: "সফল!",
        message: "পেমেন্ট সফলভাবে আপডেট হয়েছে",
      });
    } catch (error) {
      console.log({ paymentUpdateCatch: error });
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
