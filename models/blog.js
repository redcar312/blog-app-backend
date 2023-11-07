const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  blogUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogUser'
  }
  
})

module.exports = mongoose.model('Blog', blogSchema)
