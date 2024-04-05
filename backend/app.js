import ollama from 'ollama'
import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import StudentInfo from './student.js'
import UploadInfo from './upload.js'
import { log } from 'console'

const app = express()
app.use(express.json())
app.use(cors())

const JWT_SECRET =
  'kashyap532001#ygfytdtrsryeswertyuiuytdssdfghyutrtedfghytresrdfghtrdertyggfdswertgyyhgtrfdeswertvcxertxrct234567{}{'

const mongoUrl =
  'mongodb+srv://kashyap:Ks532001@cluster0.4lfueq8.mongodb.net/?retryWrites=true&w=majority'

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('connected to database')
  })
  .catch((e) => console.log(e))

app.listen(5005, () => {
  console.log('server is runing')
})

app.post('/post', async (req, res) => {
  console.log(req.body)
  const { data } = req.body
  try {
    if (data == 'aaa') {
      res.send((status = 'ok'))
    }
  } catch (error) {
    res.send((status = 'error'))
  }
})

app.post('/register', async (req, res) => {
  const { fname, lname, email, password } = req.body
  const encryptedPassword = await bcrypt.hash(password, 10)
  try {
    const oldUser = await StudentInfo.findOne({ email })
    if (oldUser) {
      return res.json({ error: 'User Exists' })
    }
    await StudentInfo.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
    })
    res.send({ status: 'ok' })
  } catch (error) {
    res.send({ status: 'error' })
  }
})

app.post('/login-user', async (req, res) => {
  const { email, password } = req.body
  const user = await StudentInfo.findOne({ email })
  if (!user) {
    return res.json({ error: 'User not found' })
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({}, JWT_SECRET)
    if (res.status(200)) {
      return res.json({ status: 'ok', data: user })
    } else {
      return res.json({ error: 'error' })
    }
  }
  res.json({ status: 'error', error: 'Invalid Password' })
})

// app.post('/savenewupload', async (req, res) => {
//   const { student_id, question, answer } = req.body
//   try {
//     let modelResponse = ''
//     let assignment = question
//     let student_submission = answer

//     const system = `You are a helpful, proficient, and generous code grading assistant.
//     You grade submissions according to provided assignment requirements.
//     Your responses are technically correct and error-free.
//     Always aim to be helpful, safe, and socially unbiased.
//     Your answers should not include harmful, unethical, racist, sexist, toxic, dangerous, or illegal content.
//     If a question lacks coherence, explain why. If you're unsure, refrain from providing false information.`
//     let user = `Assignment requirements: ${assignment}
//     Student-submitted code: ${student_submission}
//     Generate grading score and feedback message as a JSON response. Score out of 10.
//     Deduct points for major errors not following assignment requirements or conceptual mistakes.
//     Minor errors like comments or variable naming conventions should not affect the score, but should be included in feedback.
//     Limit feedback to 150 words.`
//     let prompt = '<s>[INST] <<SYS>>' + system + '<</SYS>>' + user + ' [/INST]'

//     let modelConfig = {
//       model: 'codellama',
//       system: system,
//       prompt: prompt,
//       stream: false,
//       format: 'json',
//     }
//     if (process.argv[2] && process.argv[2].length >= 2) {
//       modelConfig.content = process.argv[2]
//     }
//     invokeLLM(modelConfig)

//     async function invokeLLM(props) {
//       console.log(`-----`)
//       console.log(`[${props.model}]: ${props.prompt}`)
//       console.log(`-----`)
//       try {
//         console.log(`Running prompt...`)
//         const response = await ollama.generate({
//           model: props.model,
//           prompt: props.prompt,
//           format: props.format,
//         })
//         console.log(response.response)
//         modelResponse = response.response
//       } catch (error) {
//         console.log(`Query failed!`)
//         console.log(error)
//       }
//     }
//     console.log('********************', modelResponse)
//     const upload = await UploadInfo.create({
//       student_id: student_id,
//       question,
//       answer,
//       feedback: modelResponse,
//     })
//     await upload.save()
//     if (res.status(200)) {
//       // res.status(200).json({ message: 'Upload saved successfully' })
//       return res.json({ status: 'ok', data: modelResponse })
//     } else {
//       return res.json({ error: 'error' })
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Upload saving fail', error })
//   }
// })

app.post('/savenewupload', async (req, res) => {
  const { student_id, question, answer } = req.body
  try {
    let assignment = question
    let student_submission = answer

    const system = `You are a helpful, proficient, and generous code grading assistant. 
    You grade submissions according to provided assignment requirements. 
    Your responses are technically correct and error-free. 
    Always aim to be helpful, safe, and socially unbiased. 
    Your answers should not include harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. 
    If a question lacks coherence, explain why. If you're unsure, refrain from providing false information.`

    let user = `Assignment requirements: ${assignment}
    Student-submitted code: ${student_submission}
    Generate grading score and feedback message as a JSON response. Score out of 10. 
    Deduct points for major errors not following assignment requirements or conceptual mistakes. 
    Minor errors like comments or variable naming conventions should not affect the score, but should be included in feedback. 
    Limit feedback to 150 words.`

    let prompt = '<s>[INST] <<SYS>>' + system + '<</SYS>>' + user + ' [/INST]'

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

    console.log('************', question)
    console.log('', answer)
    console.log('', modelResponse)

    const upload = await UploadInfo.create({
      student_id: student_id,
      question: question,
      answer: answer,
      feedback: modelResponse,
    })
    await upload.save()
    // res = res.json({ status: 'ok', data: modelResponse })
    console.log(
      res
        .status(200)
        .json({ message: 'saved successfully', data: modelResponse })
    )
    res.status(200).json({ message: 'saved successfully', data: modelResponse })
  } catch (error) {
    res.status(500).json({ message: 'Upload saving fail', error })
  }
})

async function invokeLLM(props) {
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
