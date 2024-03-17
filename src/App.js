import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListaUsuarios from './ListaUsuarios';
import FormularioUsuarios from './FormularioUsuarios';

function App() {
  return (
    <div className="container">
      <ListaUsuarios />
      <FormularioUsuarios />
    </div>
  );
}

export default App;

