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
    <div>
      <div className="max-h-screen">
        <div className="flex justify-center">
          <section className=" border rounded-md mx-8 drop-shadow-lg ">
            <ul class="w-40 items-center text-center capitalize border-slate-1200 font-sans font-normal text-base  y6">
              {userOn && userOn.map((usr) => <li key={usr._id}>{usr.name}</li>)}
            </ul>
          </section>

          <section className="flex flex-col border rounded-md drop-shadow-lg">
            <div className="max-w-xl mx-2">
              {messageList.map((message, index) => (
                <p
                  key={index}
                  className="bg-purple-400 text-sm text-white px-3 py-1 border rounded-md my-3 drop-shadow-lg"
                >
                  {message.author}: {message.text}
                </p>
              ))}
            </div>
            <div className="flex flex-nowrap mt-5">
              <input
                id="input"
                type="text"
                autoComplete="off"
                placeholder="Mensagem"
                ref={messageRef}
                className="py-1 mb-5 bg-white shadow-inner my-3 px-3 mx-2 cursor-text  font-sans font-semiBold rounded-md text-base text-gray-700"
              />
              <br />
              <button
                onClick={() => handleSubmit()}
                className="rounded bg-purple-600 px-10 ml-5 hover:bg-purple-800 my-3 mx-2 shadow-purple-300 text-white font-semiBold shadow-lg items-center text-center"
              >
                Enviar
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Message;
