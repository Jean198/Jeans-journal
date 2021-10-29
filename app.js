const express = require('express')
const mongoose = require('mongoose')
const Post = require('./models/post')
const User = require('./models/user')
const userRouter = require('./routes/user')



const postRouter = require('./routes/posts')
const methodOverride = require('method-override')
const app = express()

const cookieParser= require('cookie-parser')

var port= process.env.PORT || 3000
require('dotenv').config();

const connection= async ()=>{
  try{

    const connect= await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true, useUnifiedTopology: true

      
    })

    console.log("conected to db!")

  }catch(e){

    console.log(e.message)

  }
}

connection()







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


app.get('/', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: 'desc' })
  res.render('posts/index', { posts: posts })
})



app.use('/posts', postRouter)
app.use('/', postRouter)
app.use('/test',postRouter )

app.listen(port)


