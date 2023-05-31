import { useState } from 'react';
import * as API from '../api/user';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

export default function App({ setSocket }) {
  const [cpf, setCpf] = useState('');
  const [erro, setErro] = useState({});
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const resultado = API.login({ cpf, password })

      .then((res) => {
        const socket = io.connect('http://localhost:8181', {
          transports: ['websocket'],
        });
        socket.emit('set_userName', res.doc.name);
        navigate(`/message/${res.doc._id}`);
        setSocket(socket);
      })
      .catch((err) => {
        if (err.response) {
          setErro(err.response.data);
          console.log(err.response.data);
        }
        navigate('/');
      });
  };

  return (
    <div className="flex justify-center items-center bg-purple-500">
      <div className=" bg-gray-50 shadow-lg shadow-purple-300 rounded-lg mt-50">
        <p className="px-10 font-sans font-bold text-base text-purple-800 text-center">
          Faça login para conversar no chat
        </p>
        <div className=" flex flex-col justify-items-center bg-gray-50 pt-20 rounded-lg  ">
          <input
            type="text"
            name="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="CPF"
            className="w-60 mb-5 bg-white shadow-inner px-2 rounded cursor-text mx-auto font-sans font-semiBold text-base text-gray-400"
          />
          <br />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            className="w-60 mb-5 bg-white shadow-inner px-2 justify-items-center rounded cursor-text mx-auto font-sans font-semiBold text-base text-gray-400"
          />
          <div>
            {
              <p className="text-center text-xs font-sans font-regular text-red capitalize">
                {' '}
                {erro && erro.message}
              </p>
            }
          </div>
          <br />
          <button
            onClick={() => handleSubmit()}
            className="rounded mx-20 mb-20 bg-purple-600 px-10 py-1 hover:bg-purple-800  shadow-purple-300 text-white font-semiBold shadow-lg "
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
