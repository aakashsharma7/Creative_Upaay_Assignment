import mongoose, { Schema, model } from "mongoose";

const TaskSchema = new Schema(
  {
    taskName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    priority: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      required: true,
    },
    collaborators: [
      {
        id: {
          type:String,
          required: true,
        },
        name: { type: String, required: true },
        avatar: { type: String, required: true },
      },
    ],
    commentsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    filesCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    scheduledDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);

export default Task;
