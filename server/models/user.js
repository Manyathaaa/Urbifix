import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["resident", "service_provider", "municipal"],
      default: "resident",
    },
    address: {
      type: String,
      required: false,
    },
    languages: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

const User = mongoose.model("User", userSchema);

export default User;
