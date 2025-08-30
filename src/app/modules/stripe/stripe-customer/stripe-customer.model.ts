import mongoose from "mongoose";

const stripeCustomerSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    object: { type: String, default: "customer", required: true },
    address: { type: String, required: false},
    balance: { type: Number, required: false},
    created: { type: Number, required: false},
    currency: { type: String, required: false},
    default_source: { type: String, required: false},
    delinquent: { type: Boolean, default: false, required: false},
    description: { type: String, required: false},
    discount: { type: String, required: false},
    email: { type: String, required: false},
    invoice_prefix: { type: String, required: false},
    invoice_settings: {
      custom_fields: { type: String, required: false},
      default_payment_method: { type: String, required: false},
      footer: { type: String, required: false},
      rendering_options: { type: String, required: false},
    },
    livemode: { type: Boolean, default: false, required: false},
    metadata: { type: mongoose.Schema.Types.Mixed, required: false},
    name: { type: String, required: true},
    next_invoice_sequence: { type: Number, required: false},
    phone: { type: String, required: true},
    preferred_locales: { type: mongoose.Schema.Types.Mixed, required: false},
    shipping: { type: mongoose.Schema.Types.Mixed, required: false},
    tax_exempt: { type: String, required: false},
    test_clock: { type: String, required: false},
    user: { type: mongoose.Schema.Types.ObjectId, required: true }
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the updated date
    },
  }
);

const StripeCustomer = mongoose.model("stripe_customer", stripeCustomerSchema);

export default StripeCustomer;