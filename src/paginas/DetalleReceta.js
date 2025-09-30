import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { guardarReceta } from '../servicios/servicioRecetas';
import { enviarNotificacion } from '../servicios/servicioNotificaciones';
import '../estilos/DetalleReceta.css';

const DetalleReceta = ({ recetas }) => {
  const { id } = useParams();
  const navegar = useNavigate();
  const [receta, setReceta] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const recetaEncontrada = recetas.find(r => r.id.toString() === id);
    if (recetaEncontrada) {
      setReceta(recetaEncontrada);
    }
    setCargando(false);
  }, [id, recetas]);

  const manejarGuardarReceta = async () => {
    if (receta) {
      await guardarReceta(receta);
      enviarNotificacion('Receta guardada', `La receta "${receta.titulo}" ha sido guardada para ver sin conexión.`);
    }
  };

  if (cargando) {
    return (
      <div className="contenedor-cargando">
        <div className="indicador-carga"></div>
        <p>Cargando receta...</p>
      </div>
    );
  }

  if (!receta) {
    return (
      <div className="contenedor-no-encontrado">
        <h2>Receta no encontrada</h2>
        <button onClick={() => navegar('/')} className="boton-volver">
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="contenedor-detalle-receta">
      <div className="cabecera-receta">
        <button onClick={() => navegar('/')} className="boton-volver">
          <i className="fas fa-arrow-left"></i>
        </button>
        <button onClick={manejarGuardarReceta} className="boton-guardar">
          <i className="fas fa-bookmark"></i>
        </button>
      </div>

      <div className="hero-receta">
        <img src={receta.imagen} alt={receta.titulo} className="imagen-detalle-receta" />
        <h1 className="titulo-receta">{receta.titulo}</h1>
        <div className="meta-receta">
          <span><i className="fas fa-clock"></i> {receta.tiempo} minutos</span>
          <span><i className="fas fa-signal"></i> {receta.dificultad}</span>
          <span><i className="fas fa-users"></i> {receta.porciones} porciones</span>
        </div>
      </div>

      <div className="contenido-receta">
        <section className="seccion-ingredientes">
          <h2>Ingredientes</h2>
          <ul className="lista-ingredientes">
            {receta.ingredientes.map((ingrediente, index) => (
              <li key={index}>{ingrediente}</li>
            ))}
          </ul>
        </section>

        <section className="seccion-instrucciones">
          <h2>Instrucciones</h2>
          <ol className="lista-instrucciones">
            {receta.instrucciones.map((paso, index) => (
              <li key={index}>{paso}</li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
};

export default DetalleReceta;