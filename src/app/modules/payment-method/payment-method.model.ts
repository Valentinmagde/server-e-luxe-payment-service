import mongoose from 'mongoose';

const paymentMethodSchema = new mongoose.Schema(
  {
    name: {type: Object, required: true},
    slug: {type: String, required: true},
    systems: [{type: mongoose.Schema.Types.ObjectId, ref: "system"}],
    mode: {
      type: String,
      enum: ['Test', 'Production'],
      default: 'Test'
    },
    description: {type: String, required: false}
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the updated date
    },
  }
);

const PaymentMethod = mongoose.model('payment_method', paymentMethodSchema);

export default PaymentMethod;