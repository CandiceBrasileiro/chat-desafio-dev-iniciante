import React from 'react';
import { useEffect, useState } from 'react';
import * as API from '../api/user';

const Message = () => {
  const [userOn, setUserOn] = useState([]);

  useEffect(() => {
    API.online().then((res) => setUserOn(res.userOnline));
  }, []);

  return (
    <div>
      <section>
        <ul>
          {userOn && userOn.map((usr) => <li key={usr._id}>{usr.name}</li>)}
          
        </ul>
      </section>

      <section>
        <ul id="messages"></ul>
        <input id="input" type="text" autoComplete="off" />
        <br />
        <button>Enviar</button>
      </section>
    </div>
  );
};

export default Message;
