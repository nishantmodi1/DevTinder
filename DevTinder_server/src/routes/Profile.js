const express = require('express')
const profileRouter = express.Router()
const { userAuth } = require('../middleware/auth')
const { validateEditProfileData } = require('../utils/Validation')
const bcrypt = require('bcrypt')

// GET PROFILE
profileRouter.get('/profile/view', userAuth, async(req, res,) => {
  try {
    const user = req.user
    res.send(user)
  } catch (error) {
    console.error('error>>>', error)
    // res.status(400).send('something went wrong', error)
    res.status(400).json({ message: error.message})
  }
})

profileRouter.patch('/profile/edit', userAuth, async(req, res) => {
  try {
    // data validation and data sanitization
    if(!validateEditProfileData) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user  //this is details of loggedin User
    // loggedInUser.firstName = req.body.firstName;
    Object.keys(req.body).forEach(key => loggedInUser[key] = req.body[key])

    await loggedInUser.save(); //to save and show in database

    // res.send(`${loggedInUser.firstName}, user profile update successfully`)
    res.json({message: `${loggedInUser.firstName}, user profile update successfully`, data: loggedInUser})
  } catch (error) {
    res.status(400).send('something went wrong '+ error)
  }
})

profileRouter.patch('/profile/forgot_password', userAuth, async(req, res) => {
  //here we need add forgot password:
  try{
    const {current_password, new_password} = req.body;
    const loggedInUser = req.user;
    const isPasswordValid = await loggedInUser.validatePassword(current_password)
    if(!isPasswordValid) {
      throw new Error("current password is not matching!")
    }
    // hash new password
    const newPassword = await bcrypt.hash(new_password, 10)

    //updated password
    loggedInUser.password = newPassword
    // save password in db
    await loggedInUser.save()
    // console.log('hello>>>', isPasswordValid,  req.body)
    res.json({message: "password updated successfully"})
  }catch(error){
    res.status(400).send("Error forgot password " + error.message)
  }
})

module.exports = profileRouter