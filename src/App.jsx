import React, { useState } from 'react';
import './index.css';
import Login from './components/Login';
import Message from './components/Message';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [socket, setSocket] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setSocket={setSocket} />} />
        <Route path="/message" element={<Message socket={socket} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
