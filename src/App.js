import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PantallaCarga from './paginas/PantallaCarga';
import Inicio from './paginas/Inicio';
import DetalleReceta from './paginas/DetalleReceta';
import ComponenteCamara from './componentes/ComponenteCamara';
import { obtenerRecetas, obtenerRecetasLocales } from './servicios/servicioRecetas';
import './estilos/App.css';

function App() {
  const [mostrarCarga, setMostrarCarga] = useState(true);
  const [recetas, setRecetas] = useState([]);
  const [enLinea, setEnLinea] = useState(navigator.onLine);
  const [cargando, setCargando] = useState(true);


  useEffect(() => {
    const manejarEstadoConexion = () => {
      setEnLinea(navigator.onLine);
    };

    window.addEventListener('online', manejarEstadoConexion);
    window.addEventListener('offline', manejarEstadoConexion);

    return () => {
      window.removeEventListener('online', manejarEstadoConexion);
      window.removeEventListener('offline', manejarEstadoConexion);
    };
  }, []);


  useEffect(() => {
    const cargarRecetas = async () => {
      try {
        if (enLinea) {
          const recetasAPI = await obtenerRecetas();
          setRecetas(recetasAPI);
          localStorage.setItem('recetas', JSON.stringify(recetasAPI));
        } else {
          const recetasLocales = await obtenerRecetasLocales();
          setRecetas(recetasLocales);
        }
      } catch (error) {
        console.error('Error al cargar recetas:', error);
        const recetasLocales = await obtenerRecetasLocales();
        setRecetas(recetasLocales);
      } finally {
        setCargando(false);
      }
    };

    cargarRecetas();
  }, [enLinea]);


  useEffect(() => {
    const temporizador = setTimeout(() => {
      setMostrarCarga(false);
    }, 3000);

    return () => clearTimeout(temporizador);
  }, []);


  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }, []);

  if (mostrarCarga) {
    return <PantallaCarga />;
  }

  return (
    <Router>
      <div className="App">
        {!enLinea && (
          <div className="banner-sin-conexion">
            Estás en modo sin conexión. Algunas funciones pueden no estar disponibles.
          </div>
        )}
        <Routes>
          <Route path="/" element={<Inicio recetas={recetas} cargando={cargando} />} />
          <Route path="/receta/:id" element={<DetalleReceta recetas={recetas} />} />
          <Route path="/camara" element={<ComponenteCamara />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
