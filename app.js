
const express = require('express')

const config = require('./utils/config')

const app = express();
const MONGO_URI = config.MONGO_URI
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const blogUserRouter = require('./controllers/blogUsers')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)


logger.info('connectingto', MONGO_URI)
mongoose.connect(MONGO_URI)
.then (() => {
    logger.info('connected to mongodb')
}) .catch((error) => {
    logger.error(error.message)
})  
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', blogUserRouter)
app.use('/api/login', loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app