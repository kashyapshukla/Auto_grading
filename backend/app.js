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
    const { student_Id,Question,Answer} = req.body;
    try {
        await Upload.create({
            student_Id,
            Question,
            Answer,    
          })
  
     
      res.status(200).json({ message: 'Upload saved successfully'});
    } 
    catch (error) {
      res.status(500).json({ message: 'Upload saving fail', error });
    }
  });
