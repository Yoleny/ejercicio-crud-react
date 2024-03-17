import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserList from './UserList';
import FormUser from './FormUser';

function App() {
  return (
    <div className="container">
      <UserList/>
      <FormUser />
    </div>
  );
}

export default App;
