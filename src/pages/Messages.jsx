import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './Messages.css'

const API_BASE = import.meta.env.VITE_API || 'http://new-backend-production-766f.up.railway.app/api'

function Messages() {
  const navigate = useNavigate()
  const messagesEndRef = useRef(null)

  const [conversations, setConversations] = useState([])
  const [selectedChat, setSelectedChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [messageText, setMessageText] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return navigate('/login')
    fetchConversations(token)
  }, [navigate])

  const fetchConversations = async (token) => {
    try {
      const res = await fetch(`${API_BASE}/messages/conversations`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!res.ok) throw new Error("Failed to fetch conversations")
      const data = await res.json()
      setConversations(data || [])
    } catch (err) {
      console.error(err)
      alert("Error loading conversations")
    } finally {
      setLoading(false)
    }
  }

  const fetchMessages = async (chatId) => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API_BASE}/messages/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!res.ok) throw new Error("Failed to fetch messages")
      const data = await res.json()
      setMessages(data || [])
      setSelectedChat(chatId)
      // Scroll to bottom
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100)
    } catch (err) {
      console.error(err)
      alert("Error loading messages")
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!messageText.trim() || !selectedChat) return

    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API_BASE}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          chatId: selectedChat,
          text: messageText
        })
      })
      if (!res.ok) throw new Error("Failed to send message")
      setMessageText('')
      fetchMessages(selectedChat)
    } catch (err) {
      console.error(err)
      alert("Error sending message")
    }
  }

  return (
    <div className="messages-page">
      <Navbar />

      <div className="messages-container">
        {/* LEFT: Conversations */}
        <div className="conversations-sidebar">
          <h3>Chats</h3>
          {loading && <p>Loading chats...</p>}
          {!loading && conversations.length === 0 && <p>No conversation has started yet</p>}
          {!loading && conversations.map(chat => (
            <div
              key={chat._id}
              onClick={() => fetchMessages(chat._id)}
              className={`conversation-item ${selectedChat === chat._id ? 'active' : ''}`}
            >
              {chat.user?.name || "Unnamed"}
            </div>
          ))}
        </div>

        {/* RIGHT: Messages */}
        <div className="chat-area">
          {!selectedChat ? (
            <p>Select a conversation to start messaging</p>
          ) : (
            <>
              <div className="messages-list">
                {messages.length === 0 ? (
                  <p>No messages yet</p>
                ) : (
                  messages.map(m => (
                    <div key={m._id} className={`message ${m.senderSelf ? 'sent' : 'received'}`}>
                      <p>{m.text}</p>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              <form className="message-form" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
                <button type="submit">Send</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Messages
