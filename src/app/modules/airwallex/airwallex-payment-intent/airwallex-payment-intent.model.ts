import mongoose from "mongoose";

const airwallexPaymentIntentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    request_id: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    currency: {
      type: String,
      required: true,
      uppercase: true,
      length: 3,
    },
    status: {
      type: String,
      required: true,
      enum: [
        "REQUIRES_PAYMENT_METHOD",
        "REQUIRES_PAYMENT_METHOD_OR_CANCELLATION",
        "REQUIRES_CONFIRMATION",
        "REQUIRES_CONFIRMATION_OR_CANCELLATION",
        "REQUIRES_CAPTURE",
        "REQUIRES_CAPTURE_OR_CANCELLATION",
        "SUCCEEDED",
        "CANCELED",
        "REQUIRES_CANCELLATION",
        "FAILED",
        "REQUIRES_PAYMENT_METHOD_OR_CANCELLATION",
      ],
    },
    merchant_order_id: {
      type: String,
      required: true,
    },
    return_url: {
      type: String,
    },
    descriptor: String,
    captured_amount: {
      type: Number,
      default: 0,
    },
    original_amount: {
      type: Number,
      default: 0,
    },
    original_currency: {
      type: String,
      required: false,
      length: 3,
    },
    customer_id: {
      type: String,
      required: false,
    },
    metadata: {
      type: Map,
      of: String,
      default: {},
    },
    client_secret: {
      type: String,
      required: true,
    },
    payment_method_options: {
      type: Object,
      required: false,
    },
    created_at: {
      type: Date,
      required: true,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

// Index for better query performance
airwallexPaymentIntentSchema.index({ id: 1 });
airwallexPaymentIntentSchema.index({ request_id: 1 });
airwallexPaymentIntentSchema.index({ merchant_order_id: 1 });
airwallexPaymentIntentSchema.index({ status: 1 });
airwallexPaymentIntentSchema.index({ created_at: -1 });

const AirwallexPaymentIntent = mongoose.model(
  "airwallex_payment_intent",
  airwallexPaymentIntentSchema
);

export default AirwallexPaymentIntent;
