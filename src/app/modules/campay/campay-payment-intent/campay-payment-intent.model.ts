import mongoose from "mongoose";

const campayPaymentIntentSchema = new mongoose.Schema(
  {
    reference: { type: String, required: true, unique: true },
    external_reference: { type: String, required: true },
    status: {
      type: String,
      enum: ["PENDING", "SUCCESSFUL", "FAILED"],
      default: "PENDING",
    },
    amount: { type: String, required: true },
    currency: { type: String, required: true },
    from: { type: String, required: true },
    description: { type: String, required: false },
    operator: { type: String, required: false },
    operator_reference: { type: String, required: false },
    ussd_code: { type: String, required: false },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const CampayPaymentIntent = mongoose.model(
  "campay-payment-intent",
  campayPaymentIntentSchema
);

export default CampayPaymentIntent;
