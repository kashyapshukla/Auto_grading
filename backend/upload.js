import mongoose from 'mongoose'

const UploadDetailsSchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'StudentInfo',
    },
    question: {
      type: String,
    },
    answer: {
      type: String,
    },
    feedback: {
      type: String,
    },
  },
  {
    collection: 'UploadInfo',
  }
)

export default mongoose.model('UploadInfo', UploadDetailsSchema)
