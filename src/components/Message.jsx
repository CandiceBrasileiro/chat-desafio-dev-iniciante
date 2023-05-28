import React, { useEffect, useState, useRef } from 'react';
import * as API from '../api/user';

const Message = ({ socket }) => {
  const [userOn, setUserOn] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const messageRef = useRef();

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((current) => [...current, data]);
    });

    return () => socket.off('receive_message');
  }, [socket]);

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
    <div className="container-message">
      <section className="container-online">
        <ul>
          {userOn && userOn.map((usr) => <li key={usr._id}>{usr.name}</li>)}
        </ul>
      </section>

      <section className="container-chat">
        <div>
          {messageList.map((message, index) => (
            <p key={index}>
              {message.author}: {message.text}
            </p>
          ))}
        </div>

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
