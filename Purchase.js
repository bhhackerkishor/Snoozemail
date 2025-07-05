import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
    enum: ["Free", "Pro", "Team"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  durationInMonths: {
    type: Number,
    default: 1,
  },
  paymentProvider: {
    type: String,
    default: "Razorpay",
  },
  razorpayPaymentId: String,
  razorpayOrderId: String,
  razorpaySignature: String,
  purchasedAt: {
    type: Date,
    default: Date.now,
  },
});

const Purchase =
  mongoose.models.purchaseSchema || mongoose.model("Purchase", purchaseSchema);
export default Purchase;
