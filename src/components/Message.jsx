import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as API from '../api/user';
import { useParams } from 'react-router';
// import { FaCircle, FaPaperPlane } from 'react-icons/fa';

const Message = ({ socket }) => {
  const [userOn, setUserOn] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const messageRef = useRef();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleLogout = async () => {
    const resultado = API.logout({ id }).then((res) => {
      navigate('/');
    });
  };

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
    focusInput();
  };

  const clearInput = () => {
    messageRef.current.value = '';
  };

  const focusInput = () => {
    messageRef.current.focus();
  };

  const getEnterKey = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="bg-purple-600 max-h-screen py-10">
      <div>
        <button
          className="bg-white px-8 rounded-md"
          type="submit"
          name="logout"
          onClick={() => handleLogout()}
        >
          Sair
        </button>
      </div>
      <div className="flex justify-center ">
        <h1 className=" text-5xl py-10 text-white">Chat</h1>
      </div>
      <div className="">
        <div className="flex justify-center">
          <section className=" border rounded-md mx-8 drop-shadow-lg bg-gray-100">
            <ul className=" w-40 items-center text-center capitalize border-slate-1200 font-sans  text-base py-10 font-semibold">
              {userOn &&
                userOn.map((usr) => (
                  <li key={usr._id}>
                    {' '}
                    {/* <FaCircle /> */}
                    {usr.name}
                  </li>
                ))}
            </ul>
          </section>

          <section className="flex flex-col border rounded-md drop-shadow-lg  bg-gray-100">
            <div className="max-w-xl mx-2">
              {messageList.map((message, index) => (
                <p
                  key={index}
                  className="bg-purple-600 text-sm text-white px-3 py-1 border rounded-md my-3 drop-shadow-lg"
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
                onKeyDown={(e) => getEnterKey(e)}
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
