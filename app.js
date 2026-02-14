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
    isPasswordValid = await bcrypt.compare(password, user.password)
    if(isPasswordValid) {
      //create a JWT token: here jwt.sign({ name, private_key})
      const token = await jwt.sign({ _id: user._id}, "DEV@TINDER8987")

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
    const cookie = req.cookies;
    const {token} = cookie
    if(!token){
      throw new Error("Invalid Token")
    }
    //validate the token
    const decodedMessage = await jwt.verify(token, "DEV@TINDER8987")
    console.log(decodedMessage)
    const {_id} = decodedMessage
    console.log('users id is: ', _id)
    const user = await User.findById(_id)
    console.log('user>>>', user)

    if(!user){
      throw new Error("User not exist")
    }

    console.log(cookie)
    res.send(users)
  } catch (error) {
    console.log('error>>>', error)
    // res.status(400).send('something went wrong', error)
    res.status(400).json({ message: error.message})
  }
})

// get user by email
app.get('/user', async (req, res) => {
  const userEmaild = req.body.emailId
  try {
    // const user = await User.findOne({ emailId: userEmaild })
    const users = await User.find({ emailId: userEmaild })
    if(users.length === 0) {
      res.status(404).send('user not found')
    }
    res.send(users)
  } catch (error) {
    res.status(400).send('something went wrong')
  }
})

// feed api - get all feed data
app.get('/feed', async (req, res, next) => {
  try {
     const users = await User.find({ })
     res.send(users)
  } catch (error) {
    res.status(400).send('something went wrong')
  }
})

// delete a user by findByIdandDelete
app.delete("/user", async(req, res) => {
  const userId = req.body.userId
  try {
    // const user = await User.findByIdAndDelete({_id: userId}) //same to blelow user
    const user = await User.findByIdAndDelete({userId})
  } catch (error) {
    res.status(400).send('something went wrong')
  }
})

//update user data

// app.patch('/user', async(req, res,) => {
//   // const userId = req.body._id
//   const userId = req.body.userId
//   const data = req.body;
//   try {
    
//       const ALLOWED_UPDATES = ['firstName', 'lastName', 'emailId', 'password']
//       const isUpdateAllowed = Object.keys(data).every(update => ALLOWED_UPDATES.includes(update))
//       if(!isUpdateAllowed) {
//         throw new Error('invalid updates')
//       }
//     await User.findByIdAndUpdate({_id: userId}, data, {
//       reurnDocument: 'after',
//       runValidators: true
//     }) 
//     res.send('send user successfully')
//   } catch (error) {
//     res.status(400).send('something went  wrong')
//   }
// })

app.patch('/user/:userId', async(req, res,) => {
  // const userId = req.body._id
  const userId = req.params?.userId
  const data = req.body;
  try {
    
      const ALLOWED_UPDATES = ['firstName', 'lastName', 'emailId', 'password']
      const isUpdateAllowed = Object.keys(data).every(update => ALLOWED_UPDATES.includes(update))
      if(!isUpdateAllowed) {
        throw new Error('invalid updates')
      }
      // add condition to allow only 10 skills only
      if(data.skills.length > 10){
        throw new Error('cannot add more than 10 skills')
      } {
    await User.findByIdAndUpdate({_id: userId}, data, {
      reurnDocument: 'after',
      runValidators: true
    }) 
    res.send('send user successfully')
  } }
  catch(error) {
    res.status(400).send('something went  wrong')
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



