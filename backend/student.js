import mongoose from 'mongoose'

const StudentDetailsSchema = new mongoose.Schema(
  {
    fname: String,
    lname: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    admin_id: String,
  },
  {
    collection: 'StudentInfo',
  }
)

export default mongoose.model('StudentInfo', StudentDetailsSchema)
