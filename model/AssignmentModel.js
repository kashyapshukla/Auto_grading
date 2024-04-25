import mongoose from 'mongoose'
import { ASSIGNMENT_STATUS } from '../constant.js'
const AssignmentSchema = new mongoose.Schema(
  {
    title: String,
    requirement: String,
    points: Number,
    dueDate: String,
    assignmentStatus: {
      type: String,
      enum: Object.values(ASSIGNMENT_STATUS),
      default: ASSIGNMENT_STATUS.NOT_PUBLISHED,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

export default mongoose.model('Assignment', AssignmentSchema)
