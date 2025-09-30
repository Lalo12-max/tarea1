

export const enviarNotificacion = (titulo, cuerpo) => {

  if (!('Notification' in window)) {
    alert('Este navegador no soporta notificaciones de escritorio');
    return;
  }


  if (Notification.permission === 'granted') {
    crearNotificacion(titulo, cuerpo);
  } 

  else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        crearNotificacion(titulo, cuerpo);
      }
    });
  }
};


const crearNotificacion = (titulo, cuerpo) => {
  const opciones = {
    body: cuerpo,
    icon: '/logo192.png',
    vibrate: [100, 50, 100],
    data: {
      fechaLlegada: Date.now(),
      clavePrimaria: 1
    }
  };


  const notificacion = new Notification(titulo, opciones);
  
  notificacion.onclick = () => {
    window.focus();
    notificacion.close();
  };
};


export const registrarNotificaciones = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registrado con éxito:', registration);
      })
      .catch(error => {
        console.error('Error al registrar el Service Worker:', error);
      });
  }
};