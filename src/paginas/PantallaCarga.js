import React from 'react';
import '../estilos/PantallaCarga.css';

const PantallaCarga = () => {
  return (
    <div className="contenedor-carga">
      <div className="contenido-carga">
        <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="Logo Recetas Culinarias" className="logo-carga" />
        <h1>Recetas Culinarias</h1>
        <div className="indicador-carga"></div>
      </div>
    </div>
  );
};

export default PantallaCarga;
