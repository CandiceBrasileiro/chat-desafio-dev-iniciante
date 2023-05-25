import { useState } from 'react';
import * as API from '../api/user';
import { useNavigate } from 'react-router-dom';

export default function App() {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log('aqui', cpf, password);
    const resultado = API.login({ cpf, password })
      .then((res) => {
        navigate('/message');
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
