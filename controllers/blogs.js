const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const BlogUser = require('../models/blogUser')


const getTokenFrom = (req) => {
  const authorization = req.get('authorization')
  if(authorization && authorization.startsWith('Bearer ')){
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get("/", async (req, res) => {
   const blogs = await Blog.find({}).populate('blogUser', {username: 1, name: 1})

   res.json(blogs)
    
    
})

blogsRouter.post('/', async (req, res) => {
   const body = req.body

   const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
   if(!decodedToken.id){
    res.json(401).json({error:'invalid token'})
   }

   const foundUser = await BlogUser.findById(decodedToken.id)
   const blog = new Blog ({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    blogUser: foundUser._id 
   })
   const newBlog = await blog.save()
   

   await foundUser.save()
   res.json(newBlog)
})
blogsRouter.put('/', async (req, res) => {
  const body = req.body;
  const id = req.body._id
  const foundBlog = Blog.findById(id)
  if(!foundBlog) {
    console.log(id)
  }
  const updatedBlog = await Blog.findByIdAndUpdate(id, {
    likes:body.likes
  })
  res.json(updatedBlog)
})


blogsRouter.delete('/:_id', async (req, res) => {
  try{
  const id = req.params._id
   await Blog.findByIdAndRemove(id)
  res.send("deleted")
  }
  catch(err){
   console.log(err)
  }

})
module.exports = blogsRouter