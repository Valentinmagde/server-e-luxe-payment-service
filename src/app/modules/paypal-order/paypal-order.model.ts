import mongoose from "mongoose";

const paypalOrderSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    intent: { type: String, required: false },
    status: { type: String, required: true },
    payment_source: { type: Object, required: false },
    payer: { type: Object, required: false },
    purchase_units: { type: Array, required: true },
    create_time: { type: String, required: false },
    links: { type: Array, required: true },
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the updated date
    },
  }
);

const PaypalOrder = mongoose.model("paypal-order", paypalOrderSchema);

export default PaypalOrder;
