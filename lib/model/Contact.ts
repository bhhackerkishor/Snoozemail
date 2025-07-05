// models/Contact.ts
import { Schema, model, models } from "mongoose";

export interface IContact {
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: Date;
  status: "pending" | "responded" | "archived";
}

const contactSchema = new Schema<IContact>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "responded", "archived"],
    default: "pending",
  },
});

// Use existing model or create new one
export default models.Contact || model<IContact>("Contact", contactSchema);
