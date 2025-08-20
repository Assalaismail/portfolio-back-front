import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Replace with your backend NestJS server URL and port
const socket = io('http://localhost:5000');

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Listen for messages
    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Clean up on unmount
    return () => {
      socket.off('message');
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit('message', input);
      setMessages((prev) => [...prev, input]); // Show your own message
      setInput('');
    }
  };


  return (
    <div>
      <div className="w-full bg-gray-500 py-10 lg:py-20">
        {messages.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
      </div>

    </div>
  );
};

export default Chat;
