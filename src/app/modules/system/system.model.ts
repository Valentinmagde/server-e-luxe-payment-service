import mongoose from 'mongoose';

const systemSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        description: {type: String, required: false}
    },
    {
      timestamps: {
        createdAt: "created_at", // Use `created_at` to store the created date
        updatedAt: "updated_at", // and `updated_at` to store the updated date
      },
    }
);

const System = mongoose.model('system', systemSchema);

export default System;