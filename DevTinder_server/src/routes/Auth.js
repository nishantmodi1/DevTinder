const express = require('express')
const { validateSignupData } = require('../utils/Validation')
const User = require('../models/user');
const app = express()
const authRouter = express.Router()
const bcrypt = require('bcrypt');

// these both are work same
//  app.use('/test', authMiddleware, () => {})
//  authRouter.use('/test', authMiddleware, () => {})

//sign up api
authRouter.post('/signup', async(req, res, next) => {
  // validation of data
  validateSignupData(req)

  const {firstName, lastName, emailId, password } = req.body;

  // encrypt the password
  const passwordHash = await bcrypt.hash(password, 10);

  //creating a new instance of user model
  const user = new User({
    firstName,
    lastName,
    emailId,
    password: passwordHash
  });

  // const user = new User(req.body);
  try {
    await user.save()
    res.send("user Signup successfully")
  } catch (error) {
    res.status(400).send("error saving the user")
  }
})

authRouter.post('/login', async(req, res) => {
  try{
    const {emailId, password} = req.body;
    // sanitizing the data: email and password
    console.log('emailId password', emailId, password)
    const user = await User.findOne({emailId: emailId})
    if(!user){
      throw new Error('user not found')
    }
    isPasswordValid = await user.validatePassword(password)
    if(isPasswordValid) {
      //create a JWT token: here jwt.sign({ name, private_key/secret_key})
      const token = await user.getJWT()

      // add then token to cookies and send the response back to the user
      res.cookie("token", token)
      res.send(user)
    }else {
      throw new Error('invalid credentials')
    }
  }catch(error) {
    // res.status(400).send('something went wrong', error)
    res.status(400).json({ message: error.message})
  }
})

authRouter.post('/logout', async (req, res) => {
  try {
    //both work fine, also here try catch is not required
    // res.cookie("token", null, {expiresIn: new Date(Date.now())})
    res.cookie("token", null, {expires: new Date(Date.now())})
    res.send("logout successfully")
  } catch (error) {
    res.status(400).send("logout Error")
  }
})

module.exports = authRouter;