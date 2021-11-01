const express = require('express')
const Post = require('./../models/post')
const router = express.Router()
const auth= require('./../middleware/auth')

/*
router.get('/', (req, res) => {
  
  res.render('posts/home')
})

*/

/*
router.get('/newPost', auth,  (req, res) => {
  res.render('posts/newpost', { post: new Post() })
})

*/

router.get('/newNote', auth,  (req, res) => {
  res.render('posts/newNote')
})

router.get('/login', (req, res) => {
  res.render('posts/login')
})

router.get('/edit/:id', auth, async (req, res) => {
  const post = await Post.findById(req.params.id)
  res.render('posts/edit', { post: post })
})

router.get('/:slug', async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug })
  if (post == null) res.redirect('/')
  res.render('posts/read', { post: post })
})

router.post('/', auth, async (req, res, next) => {
  req.post = new Post()
  next()
}, savepostAndRedirect('newNote'))

router.put('/:id', auth, async (req, res, next) => {
  req.post = await Post.findById(req.params.id)
  next()
}, savepostAndRedirect('edit'))

router.delete('/:id', auth, async (req, res) => {
  await Post.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

function savepostAndRedirect(path) {
  return async (req, res) => {
    let post = req.post
    post.title = req.body.title
    post.description = req.body.description
    post.markdown = req.body.markdown
    try {
      post = await post.save()
      res.redirect(`/posts/${post.slug}`)
    } catch (e) {
      res.render(`posts/${path}`, { post: post })
    }
  }
}

module.exports = router
