import jwt from 'jsonwebtoken'
import Assignment from '../model/AssignmentModel.js'
import mongoose from 'mongoose'
import multer from 'multer'
import ollama from 'ollama'
import { PROMPT, SYSTEM, USER } from '../constant.js'
import StudentSubmission from '../model/StudentSubmissionModel.js'

export const authenticatedUser = async (req, res, next) => {
  console.log('auth middleware')
  const { token } = req.cookies
  if (!token) {
    res.status(401).json({ message: 'authentication invalid' })
  }
  try {
    const { userId, role } = jwt.verify(token, 'secret')
    req.user = { userId, role }
    next()
  } catch (error) {
    res.status(401).json({ message: 'authentication invalid' })
  }
}

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(401).json({ message: 'Unauthorized to access this route' })
    }
    next()
  }
}

export const validateIdParam = async (req, res) => {
  const isValidId = mongoose.Types.ObjectId.isValid(req.params.id)
  if (!isValidId) res.status(400).json('invalid MongoDB id')
  const assignment = await Assignment.findById(req.params.id)
  if (!assignment) {
    res.status(400).json({ message: `No assignment with id ${req.params.id}` })
  }
  const isAdmin = req.user.role === 'admin'
  const isOwner = req.user.userId === assignment.createdBy.toString()
  if (!isAdmin && !isOwner) {
    res.status(404).json({ message: 'not authorized to access this' })
  }
}

export const validateViewIdParam = async (req, res) => {
  const isValidId = mongoose.Types.ObjectId.isValid(req.params.id)
  if (!isValidId) res.status(400).json('invalid MongoDB id')
  const assignment = await Assignment.findById(req.params.id)
  if (!assignment) {
    res.status(400).json({ message: `No assignment with id ${req.params.id}` })
  }
  const isAdmin = req.user.role === 'admin'
  const isOwner = req.user.role === 'user'
  if (!isAdmin && !isOwner) {
    res.status(404).json({ message: 'not authorized to access this' })
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/upload')
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname
    cb(null, fileName)
  },
})
const upload = multer({ storage })

export default upload

export async function modelFeedback(question, answer) {
  try {
    let assignment = question
    let student_submission = answer
    const system = SYSTEM
    let user = USER(assignment, student_submission)
    let prompt = PROMPT(system, user)
    // console.log('************PROMPT*****************************', prompt)
    let modelConfig = {
      model: 'codellama',
      system: system,
      prompt: prompt,
      stream: false,
      format: 'json',
    }
    if (process.argv[2] && process.argv[2].length >= 2) {
      modelConfig.content = process.argv[2]
    }
    const modelResponse = await invokeLLM(modelConfig)
    console.log('', modelResponse)
    return modelResponse
  } catch (error) {
    console.log(
      '..............Something goes wrong with modelfeedback method.................'
    )
    console.log(error)
  }
}

export async function invokeLLM(props) {
  console.log(`-----`)
  console.log(`[${props.model}]: ${props.prompt}`)
  console.log(`-----`)

  try {
    console.log('Running prompt...')
    const response = await ollama.generate({
      model: props.model,
      prompt: props.prompt,
      format: props.format,
    })
    console.log(response.response)
    return response.response
  } catch (error) {
    console.log('Query failed!')
    console.log(error)
    throw error // Rethrow the error so it can be caught in the parent function
  }
}

export const validateSubmissionIdParam = async (req, res) => {
  const isValidId = mongoose.Types.ObjectId.isValid(req.params.id)
  if (!isValidId) res.status(400).json('invalid MongoDB id')
  const submission = await StudentSubmission.findById(req.params.id)
  if (!submission) {
    res.status(400).json(`No submission with id ${req.params.id}`)
  }
  const isAdmin = req.user.role === 'admin'
  const isOwner = req.user.userId === submission.studentId.toString()
  if (!isAdmin && !isOwner) {
    res.status(404).json({ message: 'not authorized to access this' })
  }
}
