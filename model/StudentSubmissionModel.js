import mongoose from 'mongoose'
import { SUBMISSION_STATUS } from '../constant.js'

const StudentSubmissionSchema = new mongoose.Schema(
  {
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assignment',
    },
    studentId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    submission: {
      type: String,
    },
    grade: {
      type: String,
    },
    feedback: {
      type: String,
    },
    submissionStatus: {
      type: String,
      enum: Object.values(SUBMISSION_STATUS),
      default: SUBMISSION_STATUS.NOT_SUBMITTED,
    },
  },
  { timestamps: true }
)

export default mongoose.model('StudentSubmission', StudentSubmissionSchema)
