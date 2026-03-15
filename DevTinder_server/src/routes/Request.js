const express = require('express')
const { userAuth } = require('../middleware/auth')
const ConnectionRequest = require('../models/connectionRequest')
const requestRouter = express.Router()
const User = require('../models/user')

//here fromUserId is the person who already loggedIn
requestRouter.post('/request/send/:status/:toUserId', userAuth, async(req, res) => {
  try {
    const fromUserId = req.user._id
    const toUserId = req.params.toUserId
    const status = req.params.status


    const allowedStatus = ["ignored", "interested"]
    if(!allowedStatus.includes(status)) {
      return res.status(400).json({message: "status is not valid" + status})
    }

    const toUser = await User.findById(toUserId)
    if(!toUser) {
      return res.status(404).json({
        message: "user not found"
      })
    }

    //if there is already connection request is there like if 'A' send connection req to 'B' , then make sure 'B' cannot send request again
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        {fromUserId, toUserId},
        {fromUserId:toUserId, toUserId: fromUserId }
      ]
    })
    if(existingConnectionRequest) {
      return res.status(400).send({message: "connection reqest is already exists!!!"})
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId, toUserId, status
    })

    const data = await connectionRequest.save()

    //sending a connection request
    res.json({
      message: req.user.firstName + " is "+ status + " in "+ toUser.firstName,
      data: data
    })
  } catch (error) {
    res.status(400).send('something went wrong: ' + error.message)
  }
})

requestRouter.post('/request/review/:status/:requestId', userAuth, async(req, res) => {
  try {
    const loggedInUser = req.user
    const {status, requestId} = req.params
    //validate the status
    const allowedStatus = ["accepted", "rejected"]
    if(!allowedStatus.includes(status)){
      return res.status(400).json({ message: "status not allowed"})
    }
    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested"
    })
    if(!connectionRequest) {
      return res.status(404).json({message: "Connection request not found"})
    }

    connectionRequest.status = status
    const data = await connectionRequest.save()

    res.json({ message: "Connection Request " + status, data})

    //  'A' => 'B'
    //loggedInId => toUserId
    //status = interested
    //requestId should be valid


  } catch (error) {
    res.status(400).send('something went wrong: ' + error.message)
  }
})

module.exports = requestRouter