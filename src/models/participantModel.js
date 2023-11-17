import mongoose from "mongoose";
const { Schema } = mongoose;

const participantSchema = new Schema(
  {
    seminarId: { type: Schema.Types.ObjectId, ref: "Seminar", required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    occupation: String,
    education: String,
    institute: String,
  },
  {
    timestamps: true,
  }
);
const participantModel =
  mongoose.models.Participant ||
  mongoose.model("Participant", participantSchema);

export default participantModel;
