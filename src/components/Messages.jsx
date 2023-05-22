import React from 'react';

const Messages = () => {
  return (
    <>
      <aside>
        <ul>
          <li></li>
        </ul>
      </aside>

      <section>
        <ul id="messages"></ul>
        <form id="form" action="">
          <input id="input" type="text" autoComplete="off" />
          <button>Enviar</button>
        </form>
      </section>
    </>
  );
};

export default Messages;
