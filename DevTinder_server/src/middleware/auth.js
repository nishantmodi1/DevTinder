const jwt = require('jsonwebtoken')
const User = require('../models/user') 

const userAuth = async(req, res, next) => {
  try {
    //read the token from the cookies
    const {token} = req.cookies
    if(!token){
      throw new Error('Token not found')
    }

    // validate the token
    const decodedObj = await jwt.verify(token, "DEV@TINDER8987")
    const {_id} = decodedObj

    // find the user
    const user = await User.findById(_id)
    if(!user) {
      throw new Error("Invalid User/user not found")
    }
    req.user = user
    // next is use for move to the request handler
    next()
  } catch (error) {
    res.status(400).send('something went wrong: ' + error.message)
    // res.status(400).json({ message: error.message})
  }
}

module.exports = {userAuth}  