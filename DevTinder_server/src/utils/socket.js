//initialise the socket io
const socket = require('socket.io')
const crypto = require('crypto')
const { Chat } = require('../models/chat')

const getSecretRoomId = (userId, targetUserId) => {
  return crypto.createHash("sha256").update([userId, targetUserId].sort().join('$')).digest("hex")
}

const initialiseSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
      // credentials: true
    }
  })

  io.on('connection', (socket) => {
    // handle events
    socket.on("joinChat", ({ firstName, userId, targetUserId}) => {
      const roomId = getSecretRoomId(userId, targetUserId);
      console.log(firstName, 'room>>>', roomId)
      socket.join(roomId)
    })

    socket.on("sendMessage", async({firstName, lastName, userId, targetUserId, text}) => {
      // save message to database
      try {
        const roomId = getSecretRoomId(userId, targetUserId);
        console.log('roomId send meessage>>>', firstName, text)
        let chat = await Chat.findOne({
          participants: { $all: [userId, targetUserId] }
        })
        if(!chat){
          chat=new Chat({
            participants: [userId, targetUserId],
            messages: []
          })
        }
        chat.messages.push({
          senderId: userId, 
          text //text data recieved
        })
        await chat.save()
        // io.to(roomId).emit("receiveMessage", {firstName, text})
        io.to(roomId).emit("receiveMessage", {firstName, lastName, text, userId})

      } catch (error) {
        console.error('error>>>', error)
      }
      
    })

    socket.on("disconnect", () => {

    })
  })
}

module.exports = { initialiseSocket }