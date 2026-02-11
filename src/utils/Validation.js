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

module.exports = {
  validateSignupData
}