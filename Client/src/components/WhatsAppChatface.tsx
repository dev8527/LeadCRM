import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaUserCircle, FaSmile, FaPaperclip } from "react-icons/fa";

const WhatsAppChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! Welcome to WhatsApp Support. How can I help you today?", sender: "bot", timestamp: "10:30 AM" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const sendMessage = () => {
    if (input.trim() === "") return;

    // Add user message
    const newUserMessage = { 
      id: Date.now(), 
      text: input.trim(), 
      sender: "user",
      timestamp: formatTime()
    };
    setMessages(prev => [...prev, newUserMessage]);
    setInput("");

    // Simulate bot response with some variety
    setTimeout(() => {
      const botResponses = [
        "Thanks for reaching out! How can I assist you today?",
        "I'm here to help. What seems to be the issue?",
        "Our support team is ready to solve your problem.",
        "Could you provide more details about your query?"
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const newBotMessage = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: "bot",
        timestamp: formatTime()
      };
      
      setMessages(prev => [...prev, newBotMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full  mx-auto h-[650px] bg-white overflow-hidden">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-5 flex items-center">
        <div className="relative">
          <img 
            src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg" 
            alt="Support Agent" 
            className="w-12 h-12 rounded-full border-2 border-white shadow-md"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-blues-400 rounded-full border-2 border-white"></span>
        </div>
        <div className="ml-4 flex-1">
          <h2 className="font-bold text-lg">WhatsApp Support</h2>
          <p className="text-sm text-green-100 animate-pulse">Online</p>
        </div>
        <div className="flex space-x-3">
          <FaSmile className="text-xl cursor-pointer hover:text-green-200 transition" />
          <FaPaperclip className="text-xl cursor-pointer hover:text-green-200 transition" />
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#ECE5DD] scrollbar-thin scrollbar-thumb-green-200">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={`
                rounded-xl px-4 py-2 max-w-[70%] relative
                ${msg.sender === "user" 
                  ? "bg-green-500 text-white rounded-tr-none" 
                  : "bg-white text-black rounded-tl-none shadow-sm"}
                transition-all duration-300 ease-in-out transform hover:scale-105
              `}
            >
              {msg.text}
              <span className="text-xs text-gray-500 block mt-1 text-right">
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="p-3 bg-white border-t flex items-center space-x-2">
        <FaSmile className="text-xl text-gray-500 cursor-pointer hover:text-green-500 transition" />
        <FaPaperclip className="text-xl text-gray-500 cursor-pointer hover:text-green-500 transition" />
        
        <div className="flex-1 relative">
          <input
            type="text"
            className="w-full p-3 pl-4 pr-10 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
        </div>
        
        <button
          className={`
            p-3 rounded-full transition-all duration-300
            ${input.trim() === "" 
              ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
              : "bg-green-500 text-white hover:bg-green-600 active:scale-95"}
          `}
          onClick={sendMessage}
          disabled={input.trim() === ""}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default WhatsAppChat;