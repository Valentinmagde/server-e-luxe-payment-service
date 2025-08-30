import mongoose from "mongoose";

const airwallexCustomerSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    request_id: { type: String, required: true },
    status: { type: String, required: false },
    message: { type: String, required: false },
    merchant_customer_id: { type: String, required: true },
    first_name: { type: String, required: false },
    last_name: { type: String, required: false },
    email: { type: String, required: true },
    phone_number: { type: String, required: false },
    client_secret: { type: String, required: false },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: false,
  }
);

const AirwallexCustomer = mongoose.model("airwallex_customer", airwallexCustomerSchema);

export default AirwallexCustomer;
