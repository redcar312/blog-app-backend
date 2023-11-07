
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const BlogUserSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    name:{
        type: String,
     
       
    },
    pwHash:{
        type: String,
   
        minlength: 3,

    },
    
    
})
BlogUserSchema.plugin(uniqueValidator)
BlogUserSchema.set('toJSON', {
    transform: (document,returnedObject) => {
        delete returnedObject.pwHash
        
    }
} )

const BlogUser = mongoose.model('BlogUser', BlogUserSchema)
module.exports = BlogUser