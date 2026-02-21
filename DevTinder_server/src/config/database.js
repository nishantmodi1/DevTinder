const mongoose = require('mongoose')

const connectDB = async() => {
  await mongoose.connect(
    "mongodb+srv://solvekr:OVovKlaQaQUfILKr@solvekr.2wnnbra.mongodb.net/devTinder"
  )
}

module.exports = {connectDB}
