const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const BlogUser = require('../models/blogUser')

loginRouter.post('/', async (req, res) => {
    const {username, password} = req.body

    const user = await BlogUser.findOne({ username })
    const pwCorrect = user === null
    ? false:
    await bcrypt.compare(password, user.pwHash)

    if(!(user && pwCorrect)) {
        return res.status(401).json({
            error:'invalid username'
        })
    }
    const userForToken = {
        username: user.username,
        id:user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)
    res.status(200).send({token, username: user.username, name:user.name})

})



module.exports = loginRouter