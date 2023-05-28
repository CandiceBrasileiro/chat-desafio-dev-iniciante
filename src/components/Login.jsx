import { useState } from 'react';
import * as API from '../api/user';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

export default function App({ setSocket }) {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const resultado = API.login({ cpf, password })
      .then((res) => {
        const socket = io.connect('http://localhost:8181', {
          transports: ['websocket'],
        });
        socket.emit('set_userName', res.doc.name);
        navigate('/message');
        setSocket(socket);
      })
      .catch((err) => {
        console.log('err', err);
        navigate('/');
      });
  };

  return (
    <div className="flex justify-center items-center my-40 ">
      <div className=" bg-gray-50 shadow-lg shadow-purple-300 rounded-lg mt-50">
        <p className="px-10 font-sans text-center">
          Faça login para conversar no chat
        </p>
        <div className=" flex flex-col justify-items-center bg-gray-50 pt-20 rounded-lg  ">
          <input
            type="text"
            name="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="CPF"
            className="w-60 mb-5 bg-white shadow-inner  px-2 border-purple-600 rounded cursor-text mx-auto"
          />
          <br />
          <input
            type="text"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            className="w-60 mb-10 bg-white shadow-inner px-2 justify-items-center border-purple-600 rounded cursor-text mx-auto"
          />
          <br />
          <button
            onClick={() => handleSubmit()}
            className="rounded mx-20 mb-20 bg-purple-600 px-10 py-1 hover:bg-purple-800  shadow-purple-300 text-white shadow-lg "
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
