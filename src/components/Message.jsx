import React from 'react';
import { useEffect, useState, useRef } from 'react';
import * as API from '../api/user';

const Message = (socket) => {
  const [userOn, setUserOn] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const messageRef = useRef();

  useEffect(() => {
    API.online().then((res) => setUserOn(res.userOnline));
  }, []);

  const handleSubmit = () => {
    const message = messageRef.current.value;
    if (!message.trim()) return;
    socket.emit('message', message);
    clearInput();
  };
  const clearInput = () => {
    messageRef.current.value = '';
  };

  return (
    <div>
      <section>
        <ul>
          {userOn && userOn.map((usr) => <li key={usr._id}>{usr.name}</li>)}
        </ul>
      </section>

      <section>
        <ul id="messages"></ul>
        <input
          id="input"
          type="text"
          autoComplete="off"
          placeholder="Mensagem"
          ref={messageRef}
        />
        <br />
        <button onClick={() => handleSubmit()}>Enviar</button>
      </section>
    </div>
  );
};

export default Message;
