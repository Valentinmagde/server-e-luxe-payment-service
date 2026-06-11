import mongoose from "mongoose";

const cinetpayPaymentIntentSchema = new mongoose.Schema(
  {
    transaction_id: { type: String, required: true, unique: true },
    payment_token: { type: String, required: true },
    payment_url: { type: String, required: true },
    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "REFUSED", "CANCELLED"],
      default: "PENDING",
    },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    description: { type: String, required: false },
    customer_email: { type: String, required: false },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const CinetpayPaymentIntent = mongoose.model(
  "cinetpay-payment-intent",
  cinetpayPaymentIntentSchema
);

export default CinetpayPaymentIntent;
