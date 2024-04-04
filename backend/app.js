import ollama from 'ollama'
const express = require('express')
const app = express()
const mongoose = require('mongoose')
app.use(express.json())
const cors = require('cors')
app.use(cors())
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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

require('./student');
require('./upload');
const Student=mongoose.model("StudentInfo");

app.post('/register', async (req, res) => {
  const { fname, lname, email, password } = req.body
  const encryptedPassword = await bcrypt.hash(password, 10)
  try {
    const oldUser = await Student.findOne({ email })
    if (oldUser) {
      return res.json({ error: 'User Exists' })
    }
    await Student.create({
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
  const user = await Student.findOne({ email })
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

const Upload = mongoose.model('UploadInfo')

app.post('/savenewupload', async (req, res) => {
    const { student_id,question,answer} = req.body;
    try {
       const upload= await Upload.create({
            student_id:student_id,
            question,
            answer,    
          })
         await upload.save(); 
         let modelResponse = "";
         let assignment=question;
         let student_submission=answer;  
         const system = "You are a helpful and proficient and generous code grade assistant who grades for the submissions according to provided assignment requirement. You should be technically correct without errors with the response. Always answer as helpfully as possible, while being safe.  Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature. If a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.";
 
         let user = "This is the assignment requirement- " + assignment + "and this is the student-submitted answer/code -" + student_submission + ". By matching the assignment requirement you will be responsible for generating grading score and feedback message in pair using json format for student submission. Score should be out of 10. Reduce the points if there is major error in the code such as student submission is not following assignment requirement or any conceptual mistakes. Please make sure that you do not reduce the score for the minor errors such as comments in the code, camelCase convention for variable names etc.. but those minor error should be included in the feedback .Feedback should be brief with limit of 10 words.";
        
         let prompt = "<s>[INST] <<SYS>>" + system + "<</SYS>>" + user +" [/INST]";
        let modelConfig = {
        model: "codellama",
        system: system,
        prompt: prompt,
        stream: true,
        format: "json",
    }
    if( process.argv[2] && process.argv[2].length >= 2 ) {
      modelConfig.content = process.argv[2]
  }
  invokeLLM(modelConfig)
     
  async function invokeLLM(props) {
    console.log(`-----`)
    console.log(`[${props.model}]: ${props.prompt}`)
    console.log(`-----`)
    try {
        console.log(`Running prompt...`)
        const response = await ollama.generate({
            model: props.model,
            prompt: props.prompt,
            format: props.format,
        })
        console.log(response)
        modelResponse = response
    }
    catch(error) {
        console.log(`Query failed!`)
        console.log(error)
    }
}
         
     
      res.status(200).json({ message: 'Upload saved successfully'});
    } 
    catch (error) {
      res.status(500).json({ message: 'Upload saving fail', error });
    }
  });
