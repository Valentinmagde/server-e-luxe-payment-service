import mongoose from "mongoose";

const stripePaymentMethodSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    object: { type: String, default: "payment_method", required: true },
    billing_details: {
      address: {
        city: String,
        country: String,
        line1: String,
        line2: String,
        postal_code: String,
        state: String
      },
      email: { type: String, required: false},
      name: { type: String, required: false},
      phone: { type: String, required: false}
    },
    card: {
      brand: { type: String, required: true},
      checks: {
        address_line1_check: { type: String, required: false},
        address_postal_code_check: { type: String, required: false},
        cvc_check: { type: String, required: false}
      },
      country: { type: String, required: false},
      exp_month: { type: Number, required: true},
      exp_year: { type: String, required: true},
      fingerprint: { type: String, required: false},
      funding: { type: String, required: false},
      generated_from: { type: String, required: false},
      last4: { type: Number, required: false},
      networks: {
        available: [{ type: String, required: false}],
        preferred: { type: String, required: false}
      },
      three_d_secure_usage: {
        supported: { type: Boolean, required: false}
      },
      wallet: { type: String, required: false}
    },
    customer: { type: String, required: false},
    created: { type: Number, required: false},
    livemode: { type: Boolean, default: false, required: false},
    metadata: {
      order_id: String
    },
    type: { type: String, required: false}
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the updated date
    },
  }
);

const StripePaymentMethod = mongoose.model(
  "stripe_payment_method",
  stripePaymentMethodSchema
);

export default StripePaymentMethod;