import React from 'react';

const FormularioUsuarios = () => {
  return (
    <div>
      <h1>Formulario de Usuarios</h1>
      <form>
        <div className="form-group">
          <label>Nombre:</label>
          <input type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Guardar</button>
      </form>
    </div>
  );
};

export default FormularioUsuarios;
