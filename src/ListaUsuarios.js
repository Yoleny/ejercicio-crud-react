import React, { useState, useEffect } from 'react';

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/users')
      .then(response => response.json())
      .then(data => setUsuarios(data));
  }, []);

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <ul>
        {usuarios.map(usuario => (
          <li key={usuario.id}>
            <img src={usuario.avatar || 'default-avatar.jpg'} alt="avatar" />
            <p>{usuario.name}</p>
            <p>{usuario.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaUsuarios;
