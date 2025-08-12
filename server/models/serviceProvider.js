import mongoose from "mongoose";

const serviceProviderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceType: {
      type: String,
      enum: [
        "plumber",
        "electrician",
        "cleaner",
        "carpenter",
        "painter",
        "mechanic",
        "gardener",
        "handyman",
        "pest_control",
        "appliance_repair",
      ],
      required: true,
    },
    experience: {
      type: Number,
      required: true,
      min: 0,
    },
    hourlyRate: {
      type: Number,
      required: true,
      min: 0,
    },
    serviceAreas: {
      type: [String],
      required: true,
    },
    documents: {
      type: [String], // Array of document URLs/paths for ID proof, certificates
      default: [],
    },
    availability: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

const ServiceProvider = mongoose.model(
  "ServiceProvider",
  serviceProviderSchema
);

export default ServiceProvider;
