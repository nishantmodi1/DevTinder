const express = require('express')
const { userAuth } = require('../middleware/auth')
const ConnectionRequest = require('../models/connectionRequest')
const user = require('../models/user')

const userRouter = express.Router()
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills"

//get all the  pending connection Request from the loggedInUser
userRouter.get("/user/requests/received", userAuth, async(req, res) => {
  console.log('processing')
  try {
    const loggedInUser = req.user
    console.log(loggedInUser)
    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested"
    // }).populate("fromUserId", "firstName lastName") // we can write both way
    }).populate("fromUserId", ["firstName", "lastName"])
    res.json({ message: "fetch data successfully", data: connectionRequest})
  } catch (error) {
    res.status(400).send("Error: " + error.message)
  }
})

userRouter.get("/user/connections", userAuth, async(req, res) => {
  try {
    const loggedInUser = req.user
    const connectionRequest = await ConnectionRequest.find({
      $or:[
        {toUserId: loggedInUser._id, status: "accepted"},
        {fromUserId: loggedInUser._id, status: "accepted"}
      ]
    }).populate("fromUserId", "firstName lastName")
    .populate("toUserId", "firstName lastName")
    const data = connectionRequest.map((row) => {
      if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
        return row.toUserId
      }
      return row.fromUserId
    })
    res.json({message: 'Found successfully', data})
  } catch (error) {
    res.status(400).send("Error: " + error.message)
  }
})

userRouter.get('/user/feed', userAuth, async(req, res) => {
  try {
    // user should see all the user profile except 
    // 0. his own profile
    // 1. his connection from getting accepted/rejected as well as whom reviewed
    // 2. ignred people
    // 2. already sent the connection request

    // Example: new user: Nishant = [ Ankit, Ravindra, Arun, Aakash]
    // N => Rahul => Rejected N=> Vicky => Accepted
    
    const loggedInUser = req.user

    const page = parseInt(req.query.page) || 1

    let limit = parseInt(req.query.limit) || 10
    limit = limit>50? 50: limit

    const skip = (page - 1)*limit

    // Find all onnection requests (sent + received)
    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }
      ]
    }).select("fromUserId toUserId")
    // .populate("fromUserId", "firstName").populate("toUserId", "firstName")

    const hideUsersFromFeed = new Set()
    // ['A', 'B']

    connectionRequest.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString())
      hideUsersFromFeed.add(req.toUserId.toString())
    })

    //finding all remaining users whom not send or received requext to main loggedInuser
    const users = await user.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed)}},
        { _id: { $ne: loggedInUser._id}}
      ]
    }).select(USER_SAFE_DATA).skip(skip).limit(limit)
    // .populate("fromUserId", "firstName").populate("toUserId", "firstName")

    console.log(users)
    res.send({data: users})
  } catch (error) {
    res.status(400).json({ message: error.message})
  }
})

module.exports = userRouter