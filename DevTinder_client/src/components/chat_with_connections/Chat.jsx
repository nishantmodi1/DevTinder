import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../../utils/socket'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../../utils/constants'

const Chat = () => {
  const { targetUserId } = useParams()
  const user = useSelector(store => store.user)
  const userId = user?._id

  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const scrollRef = useRef(null)

  const fetchChatMessages = async () => {
    const chat = await axios.get(`${BASE_URL}chat/${targetUserId}`, {
      withCredentials: true
    })

    const chatMessages = chat?.data?.messages?.map(msg => ({
      senderId: msg.senderId._id,   // ✅ keep _id for alignment check
      firstName: msg.senderId.firstName,
      lastName: msg.senderId.lastName,
      text: msg.text
    }))

    setMessages(chatMessages)
  }

  useEffect(() => {
    fetchChatMessages()
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

const handleSend = () => {
  if (!message.trim()) return

  const socket = createSocketConnection()
  socket.emit("sendMessage", {
    firstName: user.firstName,
    lastName: user.lastName,
    userId,
    targetUserId,
    text: message
  })

  // ✅ Add your own message immediately with correct senderId
  setMessages(prev => [...prev, {
    senderId: userId,
    firstName: user.firstName,
    lastName: user.lastName,
    text: message
  }])

  setMessage("")
}

  useEffect(() => {
    if (!userId || !targetUserId) return

    const socket = createSocketConnection()

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId
    })

    socket.on("receiveMessage", ({ firstName, lastName, text, userId: senderId }) => {
      // ✅ server emits userId as the sender — map it to senderId
      setMessages(prev => [...prev, { firstName, lastName, text, senderId }])
    })

    return () => {
      socket.disconnect()
    }
  }, [userId, targetUserId])

  return (
    <div data-theme="dark" className="h-screen flex flex-col">

      {/* Navbar */}
      <div className="navbar bg-base-300 shadow-md px-4">
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Chat</h1>
        </div>
      </div>

      {/* Chat Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-2 bg-base-200"
      >
        {messages.length === 0 && (
          <p className="text-center text-gray-400 mt-10">
            No messages yet. Say hello! 👋
          </p>
        )}

        {messages.map((msg, index) => {
          const isSender = msg.senderId === userId  // ✅ correct alignment
          console.log(isSender)

          return (
            <div
              key={index}
              className={`chat ${isSender ? "chat-end" : "chat-start"}`}
            >
              {!isSender && (
                <div className="chat-header text-xs opacity-60 mb-1">
                  {msg.firstName} {msg.lastName}
                </div>
              )}
              <div className="chat-bubble">
                {msg.text}
              </div>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <div className="p-3 bg-base-300 flex gap-2">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend} className="btn btn-primary">
          Send
        </button>
      </div>

    </div>
  )
}

export default Chat