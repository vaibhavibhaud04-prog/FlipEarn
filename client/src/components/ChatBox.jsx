import React, { useEffect, useState,useRef } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { dummyChats } from '../assets/assets';
import { Loader2Icon, X } from 'lucide-react';
import { clearChat } from '../app/features/chatSlice';
import {format} from 'date-fns';

const ChatBox = () => {
  const { listing, chatId, isOpen } = useSelector((state) => state.chat)
  
  console.log("CHAT STATE:", {
  listing,
  chatId,
  isOpen,
});
  const dispatch = useDispatch();

  const user = { id: 'user_2'};
 


  const [chat, setChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)

  const fetchChat = async () => {
    setChat(dummyChats[0])
    setMessages(dummyChats[0].messages)
    setIsLoading(false)
  }

  useEffect(() => {
    if (listing) {
      fetchChat()
    }
  }, [listing])

  const handleSend = () => {
    if (!newMessage.trim()) return
    setIsSending(true)

    const newMsg = {
      id: Date.now(),
      senderId: user.id,
      senderName: user.name,
      text: newMessage,
      timestamp: new Date().toLocaleString(),
    }

    setMessages((prev) => [...prev, newMsg])
    setNewMessage("")
    setIsSending(false)
  }

  useEffect(() => {
    if(!isOpen) {
      setChat(null)
      setMessages([])
      setNewMessage("")
      setIsLoading(true)
      setIsSending(false)
    }
  }, [isOpen])

  if (!isOpen || !listing) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden mt-10">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4 flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{listing?.title}</h3>
            <p className="text-sm text-indigo-100 truncate">{user.id===listing?.ownerId ? `Chatting with buyer (${chat?.chatUser?.name || 'Loading...'})` : `Chatting with seller (${chat?.ownerUser?.name || 'Loading...'})`}</p>
          </div>
          <button onClick={()=>dispatch(clearChat())} className='ml-4 p-1 hover:bg-white/20 hover:bg-opacity-20 rounded-lg transition-colors'>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-100">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2Icon className="size-6 animate-spin text-indigo-600"/>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-gray-500 mb-2">No messages yet.</p>
                <p className="text-sm text-gray-400">Start the conversation!</p>
              </div>
            </div>
          ) :(
            messages.map((message)=>(
              <div
  key={message.id}
  className={`flex ${
    message.senderId === user.id
      ? 'justify-end'
      : 'justify-start'
  }`}
>
  <div
    className={`max-w-[70%] rounded-lg p-3 pb-1 ${
      message.senderId === user.id
        ? 'bg-indigo-600 text-white'
        : 'bg-white border border-gray-200 text-gray-800'
    }`}
  >
    <p className="text-sm break-words whitespace-pre-wrap">
  {message.text || message.message}
</p>

    <p
      className={`text-[10px] mt-1 ${
        message.senderId === user.id
          ? 'text-indigo-200'
          : 'text-gray-400'
      }`}
    >
      {format(
        new Date(
          message.createdAt ||
          message.timestamp ||
          Date.now()
        ),
        "MMM dd 'at' h:mm a"
      )}
      </p>
  </div>
</div>
            ))
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-white flex items-center gap-3">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            onClick={handleSend}
            disabled={isSending}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatBox
