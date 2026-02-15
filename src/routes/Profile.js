const express = require('express')
const profileRouter = express.Router()
const { userAuth } = require('../middleware/auth')

// GET PROFILE
profileRouter.get('/profile', userAuth, async(req, res,) => {
  try {
    const user = req.user
    res.send(user)
  } catch (error) {
    console.log('error>>>', error)
    // res.status(400).send('something went wrong', error)
    res.status(400).json({ message: error.message})
  }
})

module.exports = profileRouter