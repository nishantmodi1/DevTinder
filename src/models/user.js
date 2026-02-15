const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
  firstName: {
    type: String,
    required:true,
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
    validate(value){
      if(!["male", "female", "others"].includes(value)){
        throw new Error("gender not valid")
      }
    }
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