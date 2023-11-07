const bcrypt = require('bcryptjs')
const blogUserRouter = require('express').Router()
const BlogUser = require('../models/blogUser');


blogUserRouter.get('/', async (req, res) => {
    const users = await BlogUser.find({})


    res.json(users)
})






blogUserRouter.post('/', async (req, res) => {
    const {username, name, password } = req.body

   

    const saltrounds = bcrypt.genSaltSync(10)
    const pwHash = await bcrypt.hash(password, saltrounds)

    const blogUser = new BlogUser ({
        username, 
        name,
        pwHash
    })

    const savedUser = await blogUser.save()

    res.status(201).json(savedUser)

}) 







module.exports = blogUserRouter