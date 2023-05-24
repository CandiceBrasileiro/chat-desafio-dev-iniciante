import axios from 'axios';
import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as API from '../api/user';

const Login = () => {
  const [cpf, setCpf] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = () => {
    const resultado = API.login({ cpf, password });

    if (resultado) {
      navigate('/login');
    }
  };

  return (
    <div>
      <form>
        <p>Faça Login para conversar no chat</p>
        <input
          type="input"
          name="cpf"
          placeholder="CPF"
          value={cpf || ''}
          onChange={(e) => setCpf(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={password || ''}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <br />
        <button onClick={() => handleSubmit()}>Entrar</button>
      </form>
    </div>
  );
};

export default Login;
