import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const issueSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    reporterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "plumbing",
        "electrical",
        "cleaning",
        "carpentry",
        "painting",
        "mechanical",
        "gardening",
        "handyman",
        "pest_control",
        "appliance_repair",
      ],
    },
    description: {
      type: String,
      required: true,
    },
    photos: [
      {
        type: String,
        required: true,
      },
    ],
    location: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
    status: {
      type: String,
      required: true,
      enum: ["open", "in_progress", "resolved", "closed"],
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    comments: [commentSchema],
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);
