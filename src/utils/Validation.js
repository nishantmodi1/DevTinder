const validator = require('validator');

const validateSignupData = (req) => {
  const {firstName, lastName, emailId, password} = req.body;
  if(!firstName || !lastName || !emailId || !password) {
    throw new Error('All fields are required')
  }
  else if(password.length < 6) {
    throw new Error('Password must be at least 6 characters long')
  }else if(validator.isEmail(emailId) === false) {
    throw new Error('Invalid email address')
  }else if(validator.isStrongPassword(password) === false) {
    throw new Error('Password must contain at least 8 characters, including uppercase letters, lowercase letters, numbers, and symbols')
  }
}

const validateEditProfileData = (req) => {
  const allowedEditFields = ["firstName", "lastName", "emailId", "photoUrl", "gender", "about", "age", "about", "skills"]

  const isEditValue = Object.keys(req.body).every(field => allowedEditFields.includes(field))
  return isEditValue
}

module.exports = {
  validateSignupData, validateEditProfileData
}