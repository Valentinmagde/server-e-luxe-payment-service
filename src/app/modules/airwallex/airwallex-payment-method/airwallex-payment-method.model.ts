import mongoose from "mongoose";

const airwallexPaymentMethodSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    request_id: { type: String, required: true },
    customer_id: { type: String, required: true },
    type: { type: String, required: true },
    card: { type: Object, required: false },
    status: { type: String, required: false },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
  },
  {
    timestamps: false,
  }
);

const AirwallexPaymentMethod = mongoose.model(
  "airwallex_payment_method",
  airwallexPaymentMethodSchema
);

export default AirwallexPaymentMethod;
