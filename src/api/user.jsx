import axios from 'axios';
export const login = async (user) => {
  console.log('USER', user);
  const resultado = await axios.put('http://localhost:3131/login', user);
  return resultado.data;
};
