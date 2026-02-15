const express = require('express');
const { connectDB } = require('./src/config/database');
const User = require('./src/models/user');
require("./src/config/database");
const { validateSignupData } = require('./src/utils/Validation')
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser')
const app = express();
const jwt = require("jsonwebtoken");
const user = require('./src/models/user');
const { userAuth } = require('./src/middleware/auth')

app.use(express.json())
app.use(cookieParser())

//sign up api
app.post('/signup', async(req, res, next) => {
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

app.post('/login', async(req, res) => {
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
      res.send('login successful')
    }else {
      throw new Error('invalid credentials')
    }
  }catch(error) {
    // res.status(400).send('something went wrong', error)
    res.status(400).json({ message: error.message})
  }
})

// GET PROFILE
app.get('/profile', userAuth, async(req, res,) => {
  try {
    const user = req.user
    res.send(user)
  } catch (error) {
    console.log('error>>>', error)
    // res.status(400).send('something went wrong', error)
    res.status(400).json({ message: error.message})
  }
})

app.post('/sendConnectionRequest', userAuth, (req, res) => {
  try {
    const user = req.user
    //sending a connection request
    console.log(user.firstName)
    res.send(user.firstName + " send the connection request")
  } catch (error) {
    res.status(400).send('something went wrong: ' + error.message)
  }
})

connectDB()
  .then(() => {
    console.log('Database connection established...');
    app.listen(8000, () => {
      console.log('server is listening in port 8000...')
    })
  })
  .catch(err => {
    console.log('Database cannot be connected');
  });



