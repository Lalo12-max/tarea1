import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { enviarNotificacion } from '../servicios/servicioNotificaciones';
import '../estilos/Inicio.css';

const Inicio = ({ recetas, cargando }) => {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  const recetasFiltradas = recetas.filter(receta =>
    receta.titulo.toLowerCase().includes(terminoBusqueda.toLowerCase())
  );

  const probarNotificacion = () => {
    enviarNotificacion('¡Bienvenido a Recetas Culinarias!', 'Explora nuevas recetas y guárdalas para verlas sin conexión.');
  };

  return (
    <div className="contenedor-inicio">
      <header className="cabecera-inicio">
        <h1>Recetas Culinarias</h1>
        <div className="acciones-cabecera">
          <button onClick={probarNotificacion} className="boton-notificacion">
            <i className="fas fa-bell"></i>
          </button>
          <Link to="/camara" className="boton-camara">
            <i className="fas fa-camera"></i>
          </Link>
        </div>
      </header>

      <div className="contenedor-busqueda">
        <input
          type="text"
          placeholder="Buscar recetas..."
          value={terminoBusqueda}
          onChange={(e) => setTerminoBusqueda(e.target.value)}
          className="entrada-busqueda"
        />
      </div>

      {cargando ? (
        <div className="contenedor-cargando">
          <div className="indicador-carga"></div>
          <p>Cargando recetas...</p>
        </div>
      ) : (
        <div className="cuadricula-recetas">
          {recetasFiltradas.length > 0 ? (
            recetasFiltradas.map(receta => (
              <Link to={`/receta/${receta.id}`} key={receta.id} className="tarjeta-receta">
                <img src={receta.imagen} alt={receta.titulo} className="imagen-receta" />
                <div className="info-receta">
                  <h3>{receta.titulo}</h3>
                  <p>{receta.tiempo} minutos | {receta.dificultad}</p>
                </div>
              </Link>
            ))
          ) : (
            <div className="sin-resultados">
              <p>No se encontraron recetas que coincidan con tu búsqueda.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Inicio;