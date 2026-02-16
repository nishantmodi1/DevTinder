const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
  firstName: {
    type: String,
    required:true,
    // index: true, //for mongodb easy search
    minLength: 4,
    maxLength: 50
  },
  lastName: {
    type: String,
    required:true
  },
  emailId: {
    type: String,
    lowercase: true,
    required:true,
    unique: true,
    trim: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error('email is not valid')
      }
    }
  },
  password: {
    type: String,
    required:true,
    // validate(value){
    //   if(value.length < 4){
    //     throw new Error('password must be at least 6 characters long')
    //   }
    // }
  },
  gender: {
    type: String,
    //instead of validate function here we can use enum as well
    enum: {
      values: ["male", "female", "others"],
      message: `{VALUE} is not valid gender type`
    }
    // validate(value){
    //   if(!["male", "female", "others"].includes(value)){
    //     throw new Error("gender not valid")
    //   }
    // }
  },
  age: {
    type: Number
  },
  photoUrl: {
    type: String, 
    default: 'https://www.google.com',
      validate(value){
        if(!validator.isURL(value)){
          throw new Error('url is not valid')
        }
      }
  },
  about:{
    type: String,
  },
  skills: {
    type: [String]
  },
}, { timestamps: true })

userSchema.index({ firstName: 1, lastName: 1}) //compount index in mongo DB

userSchema.methods.getJWT = async function() {
  const user = this
  const token = await jwt.sign({ _id: user._id}, "DEV@TINDER8987", { expiresIn: "7d"})
  return token
}

userSchema.methods.validatePassword = async function(passwordInputByUser) {
  const user = this
  const passwordHash = user.password
  const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash)
  return isPasswordValid
}

module.exports = mongoose.model("User", userSchema)
