const mongoose = require("mongoose");
const { Schema } = mongoose;

const toDoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      required: true,
      default: false,   // Default to false
    },
    completedOn: {
      type: Date,       // Changed from String to Date
    },
    createdBy: {
      type: Schema.ObjectId,
      ref: "User",      // Ensure every task has a creator
    },
  },
  {
    timestamps: true,   // Moved to the correct position
  }
);

const ToDo = mongoose.model("ToDo", toDoSchema);

module.exports = ToDo;

