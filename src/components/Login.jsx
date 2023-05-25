import { useState } from 'react';
import * as API from '../api/user';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

export default function App({setSocket}) {
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
        setSocket(socket)
      })
      .catch((err) => {
        console.log('err', err);
        navigate('/');
      });
  };

  return (
    <div>
      <input
        type="text"
        name="cpf"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
        placeholder="CPF"
      />
      <br />
      <input
        type="text"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
      />
      <br />
      <button onClick={() => handleSubmit()}>Enviar</button>
    </div>
  );
}
