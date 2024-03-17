import React, { useState, useEffect } from "react";
import axios from "axios";

const defaultAvatar = "https://via.placeholder.com/150";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/users")
      .then((response) => setUsers(response.data))
      .catch((error) => setError(error));
  }, []);

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error.message}</div>}
      <h1>Listado de Usuarios</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <img src={user.avatar || defaultAvatar} alt={user.name} />
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <button onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default UserList;