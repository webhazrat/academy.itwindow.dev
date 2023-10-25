import connectDB from "@/src/lib/connect";
import { EnrollSchema } from "@/src/lib/validation";
import { checkAdmin } from "@/src/middleware/serverAuth";
import accountModel from "@/src/models/paymentModel";
import { z } from "zod";

export default async function hanlder(req, res) {
  if (req.method === "POST") {
    try {
      const session = await checkAdmin(req, res);
      EnrollSchema.parse(req.body);
      let {
        enrollId,
        userId,
        paymentMethod,
        transactionId,
        amount,
        status,
        comment,
      } = req.body;
      if (paymentMethod === "Cash") {
        transactionId = "";
      }
      await connectDB();
      await accountModel.create({
        enrollId,
        userId,
        paymentMethod,
        transactionId,
        amount,
        status,
        comment,
      });
      res.status(200).json({
        status: 200,
        title: "সফল!",
        message: "পেমেন্ট সফলভাবে সংযুক্ত হয়েছে",
      });
    } catch (error) {
      console.log({ accountsCreateCatch: error });
      // EnrollSchema zodError
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
