import axios from 'axios';
import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [cpf, setCpf] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log('autenticou nnn');
    const user = { cpf, password };
    axios.put(`${baseURL}/login`, { cpf, password }).then((response) => {
      navigate('/messages');
    });
  };

  const putLogin = async () => {
    try {
      console.log(response)
      const response = await axios.put("http://localhost:3131/login")

    }catch(error){
      console.log(error)
    }
  }


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
