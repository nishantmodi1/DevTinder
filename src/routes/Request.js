const express = require('express')
const { userAuth } = require('../middleware/auth')
const requestRouter = express.Router()

requestRouter.post('/sendConnectionRequest', userAuth, (req, res) => {
  try {
    const user = req.user
    //sending a connection request
    res.send(user.firstName + " send the connection request")
  } catch (error) {
    res.status(400).send('something went wrong: ' + error.message)
  }
})

module.exports = requestRouter