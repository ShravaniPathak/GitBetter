import mongoose from "mongoose";
const { Schema } = mongoose;

const habitSchema = new Schema(
  {
    user: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    color: {
      type: String,
      uppercase: true,
      default: "#A61212",
      match: /^#([0-9A-F]{3}){1,2}$/i 
    },
    goal: {
      type: String,
      enum: ["Daily", "Weekly", "Monthly"],
      default: "Daily",
    },
    completions: {
      type: Number,
      default: 0,
      min: 0,
    },
    timestamps: [
      {
        periodType: {
          type: String,
          enum: ["daily", "weekly", "monthly"],
          required: true,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
          required: true,
        },
        totalTaps: {
          type: Number,
          default: 0,
          min: 0,
        },
        tapsPerDay: {
          type: Map,
          of: Number,
          default: {},
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Habit", habitSchema);
