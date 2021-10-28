const express = require('express')
const mongoose = require('mongoose')
const Post = require('./models/post')
const User = require('./models/user')
require('./db/mongoose')
const userRouter = require('./routes/user')
require('dotenv').config()

const postRouter = require('./routes/posts')
const methodOverride = require('method-override')
const app = express()
const bcrypt= require('bcryptjs')
const cookieParser= require('cookie-parser')



mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true, useUnifiedTopology: true, 
}
, err => {
  if(err) throw err;
  console.log('Connected to MongoDB!!!')
  });




const port= process.env.PORT || 3000




app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(userRouter)
app.use(cookieParser())







//Posting a user

app.post('/users', (req,res)=>{
  const user = new User(req.body)

  user.save().then(()=>{
     res.send(user)
  }).catch((e)=>{
     res.send(e)
  })
})


app.get('/posts', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: 'desc' })
  res.render('posts/index', { posts: posts })
})

app.use('/posts', postRouter)
app.use('/', postRouter)

app.listen(port)


/*
const jwt = require('jsonwebtoken')



const myFunction= async()=>{
  const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', {expiresIn: '7 days'})
  

  const data= jwt.verify(token, 'thisismynewcourse')

  
}

myFunction()

*/