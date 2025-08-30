import mongoose from "mongoose";

const stripePaymentIntentSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    object: { type: String, default: "payment_intent", required: true },
    amount: { type: Number, required: true },
    amount_capturable: { type: Number, required: false },
    amount_details: {
      tip: {}
    },
    amount_received: { type: Number, required: false },
    application: { type: String, required: false },
    application_fee_amount: { type: String, required: false },
    automatic_payment_methods: {
      enabled: Boolean
    },
    canceled_at: { type: Number, required: false },
    cancellation_reason: { type: String, required: false },
    capture_method: { type: String, required: false },
    client_secret: { type: String, required: false },
    confirmation_method: { type: String, required: false },
    created: { type: Number, required: false },
    currency: { type: String, required: false },
    customer: { type: String, required: false },
    description: { type: String, required: false },
    invoice: { type: String, required: false },
    last_payment_error: { type: String, required: false },
    latest_charge: { type: String, required: false },
    livemode: { type: Boolean, default: false, required: false },
    metadata: {
      order_id: String
    },
    next_action: { type: String, required: false },
    on_behalf_of: { type: String, required: false },
    payment_method: { type: String, required: false },
    payment_method_option: {
      card: {
        installments: String,
        mandate_options: String,
        network: String,
        request_three_d_secure: String
      }
    },
    payment_method_types: [{ type: String, required: false }],
    processing: { type: String, required: false },
    receipt_email: { type: String, required: false },
    review: { type: String, required: false },
    setup_future_usage: { type: String, required: false },
    shipping: { type: String, required: false },
    statement_descriptor: { type: String, required: false },
    statement_descriptor_suffix: { type: String, required: false },
    status: { type: String, required: false },
    transfer_data: { type: String, required: false },
    transfer_group: { type: String, required: false }
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the updated date
    },
  }
);

const StripePaymentIntent = mongoose.model(
  "stripe_payment_intent",
  stripePaymentIntentSchema
);

export default StripePaymentIntent;
