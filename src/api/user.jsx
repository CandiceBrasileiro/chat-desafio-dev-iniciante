import axios from 'axios';
export const login = async (user) => {
  console.log('USER', user);
  const resultado = await axios.put('http://localhost:8181/login', user);
  return resultado.data;
};

export const online = async () => {
  const res = await axios.get('http://localhost:8181/users/online');
  return res.data;
};
