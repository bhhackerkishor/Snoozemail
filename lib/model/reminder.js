import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
    },
    to: String,
    subject: String,
    body: String, // plain text
    html: String, // added HTML content
    remindAt: Date,
    status: { type: String, default: "pending" },
    sent: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  },
);

const Reminder =
  mongoose.models.Reminder || mongoose.model("Reminder", reminderSchema);
export default Reminder;
