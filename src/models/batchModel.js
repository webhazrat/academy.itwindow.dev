import mongoose from "mongoose";
const { Schema } = mongoose;

const batchSchema = new Schema(
  {
    batchId: { type: String, required: true, unique: true },
    classDays: [String],
    time: String,
    status: String,
  },
  {
    timestamps: true,
  }
);
const batchModel =
  mongoose.models.Batch || mongoose.model("Batch", batchSchema);

export default batchModel;
