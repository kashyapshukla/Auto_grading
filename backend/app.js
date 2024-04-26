import 'express-async-errors'
import morgan from 'morgan'
import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import User from './model/UserModel.js'
import { ASSIGNMENT_STATUS, mongoUrl } from './constant.js'
import {
  authenticatedUser,
  authorizePermissions,
  validateIdParam,
  modelFeedback,
  validateViewIdParam,
  validateSubmissionIdParam,
} from './middleware/validationMiddleware.js'
import cookieParser from 'cookie-parser'
import Assignment from './model/AssignmentModel.js'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'
import upload from './middleware/validationMiddleware.js'
import cloudinary from 'cloudinary'
import { promises as fs } from 'fs'
import StudentSubmissionModel from './model/StudentSubmissionModel.js'

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('dev')) // for sever logs
app.use(cookieParser())

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('connected to database')
  })
  .catch((e) => console.log(e))

app.listen(5300, () => {
  console.log('server is running on....')
})

const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname, './public')))
cloudinary.config({
  cloud_name: '',
  api_key: '',
  api_secret:'',
})
/**
 * Login, Registration and Logout API
 */
app.post('/api/register', async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0
  req.body.role = isFirstAccount ? 'admin' : 'user'

  const salt = await bcrypt.genSalt(10)
  const encryptedPassword = await bcrypt.hash(req.body.password, salt)
  req.body.password = encryptedPassword

  try {
    const oldUser = await User.findOne({ email: req.body.email })
    if (oldUser) {
      return res.status(400).json({ msg: 'email already exists' })
    }
    await User.create(req.body)
    res.status(201).send({ msg: 'user created' })
  } catch (error) {
    res.send({ status: 'error' })
  }
})

app.post('/api/login-user', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }
  const isValidUser = await bcrypt.compare(password, user.password)
  if (!isValidUser) {
    res.status(401).json({ msg: 'Invalid credential' })
  }
  const token = jwt.sign({ userId: user._id, role: user.role }, 'secret')
  const oneDay = 1000 * 60 * 60 * 24
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
  })
  res.status(201).json({ msg: 'user logged in' })
})

app.get('/api/logout', (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  res.status(200).json({ msg: 'user logged out' })
})

/**
 * Test API
 */
app.post(
  '/api/sv',
  authenticatedUser,
  authorizePermissions('admin'),
  async (req, res) => {
    console.log(req.user.userId, req.user.role)
    res.status(200).json({ msg: 'data' })
  }
)

/**
 * user profile and update API
 */
app.get('/api/users/current-user', authenticatedUser, async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId })
  res.status(200).json({ user })
})

app.patch(
  '/api/users/update-user',
  authenticatedUser,
  upload.single('avatar'),
  async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (user && user._id.toString() != req.user.userId) {
      res.status(400).json({ msg: 'email already exists' })
    }
    const obj = { ...req.body }
    delete obj.password
    if (req.file) {
      const response = await cloudinary.v2.uploader.upload(req.file.path)
      await fs.unlink(req.file.path)
      obj.avatar = response.secure_url
      obj.avatarPublicId = response.public_id
    }
    const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj)
    if (req.file && updatedUser.avatarPublicId) {
      await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId)
    }
    res.status(200).json({ msg: 'User Updated' })
  }
)

app.get(
  '/api/users/admin/app-stats',
  authenticatedUser,
  authorizePermissions('admin'),
  async (req, res) => {
    const users = await User.countDocuments()
    const assignments = await Assignment.countDocuments()
    const publishedAssignments = await Assignment.countDocuments({
      assignmentStatus: ASSIGNMENT_STATUS.PUBLISHED,
    })
    const unpublishedAssignments = await Assignment.countDocuments({
      assignmentStatus: ASSIGNMENT_STATUS.NOT_PUBLISHED,
    })
    res.status(200).json({
      users,
      assignments,
      publishedAssignments,
      unpublishedAssignments,
    })
  }
)

/**
 * Assignment API
 *
 */
app.get('/api/assignments', authenticatedUser, async (req, res) => {
  if (req.user.role === 'admin') {
    const assignments = await Assignment.find()
    res.status(200).json({ assignments: assignments })
  } else {
    const assignments = await Assignment.find({
      assignmentStatus: ASSIGNMENT_STATUS.PUBLISHED,
    })
    res.status(200).json({ assignments: assignments })
  }
})

app.post(
  '/api/assignments',
  authenticatedUser,
  authorizePermissions('admin'),
  async (req, res) => {
    req.body.createdBy = req.user.userId
    const assignment = await Assignment.create(req.body)
    res.status(201).json({ assignment })
  }
)

app.get('/api/assignments/:id', authenticatedUser, async (req, res) => {
  await validateViewIdParam(req, res)
  const assignment = await Assignment.findById(req.params.id)
  res.status(200).json({ assignment })
})

app.patch(
  '/api/assignments/:id',
  authenticatedUser,
  authorizePermissions('admin'),
  async (req, res) => {
    await validateIdParam(req, res)
    const updatedAssignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body
    )
    res
      .status(200)
      .json({ message: `Assignment modified`, assignment: updatedAssignment })
  }
)

app.delete(
  '/api/assignments/:id',
  authenticatedUser,
  authorizePermissions('admin'),
  async (req, res) => {
    await validateIdParam(req, res)
    const removedAssignment = await Assignment.findByIdAndDelete(req.params.id)
    res
      .status(200)
      .json({ message: `Assignment Deleted`, assignment: removedAssignment })
  }
)

/**
 * student submission API
 */
app.post('/api/assignments/submission', authenticatedUser, async (req, res) => {
  const { assignmentId, submission, submissionStatus } = req.body
  await StudentSubmissionModel.deleteOne({
    assignmentId: assignmentId,
    studentId: req.user.userId,
  })
  const assignment = await Assignment.findById(assignmentId)
  let modelResponse = await modelFeedback(assignment.requirement, submission)
  const upload = await StudentSubmissionModel.create({
    studentId: req.user.userId,
    assignmentId: assignmentId,
    submission: submission,
    feedback: modelResponse,
    submissionStatus: submissionStatus,
  })
  res.status(200).json({ message: 'saved successfully', data: upload })
})

app.get('/api/submission/details/:id', authenticatedUser, async (req, res) => {
  await validateSubmissionIdParam(req, res)
  const submission = await StudentSubmissionModel.findById(req.params.id)
  const assignDetails = await Assignment.findById(submission.assignmentId)
  const response = {
    assignmentDetails: assignDetails,
    submissionDetails: submission,
  }
  res.status(200).json({ response })
})

app.get('/api/submission/grades', authenticatedUser, async (req, res) => {
  const submissions = await StudentSubmissionModel.find({
    studentId: req.user.userId,
  })
  res.status(200).json({ submissions: submissions })
})

/**
 * 404 and 500 Error
 */
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Resource not found' })
})

app.use((err, req, res, next) => {
  console.log(err)
  const statusCode = err.statusCode || 500
  const msg = err.message || 'Something went wrong, try again later'
  res.status(statusCode).json({ message: msg })
})
