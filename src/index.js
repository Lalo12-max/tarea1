import React from 'react';
import ReactDOM from 'react-dom/client';
import './estilos/index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { registrarNotificaciones } from './servicios/servicioNotificaciones';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


serviceWorkerRegistration.register();


registrarNotificaciones();
