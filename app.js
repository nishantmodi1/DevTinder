const express = require('express');
const { connectDB } = require('./src/config/database');
require("./src/config/database");
const cookieParser = require('cookie-parser')
const app = express();

app.use(express.json())
app.use(cookieParser())

const authRouter = require('./src/routes/Auth')
const profileRouter = require('./src/routes/Profile')
const requestRouter = require('./src/routes/Request')

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)

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



