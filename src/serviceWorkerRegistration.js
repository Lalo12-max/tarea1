// Este archivo opcional se puede usar para registrar un service worker.
// register() no se llama por defecto.

// Esto permite que la app cargue más rápido en visitas posteriores en producción y da
// capacidades offline. Sin embargo, también significa que los desarrolladores (y usuarios)
// solo verán actualizaciones desplegadas en visitas posteriores a una página, después de que todas
// las pestañas existentes abiertas en la página se hayan cerrado, ya que se sirven recursos previamente en caché.

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] es la dirección IPv6 localhost.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 se consideran localhost para IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // El constructor de URL está disponible en todos los navegadores que soportan SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Nuestro service worker no funcionará si PUBLIC_URL está en un origen diferente
      // de donde se sirve nuestra página. Esto podría suceder si se usa un CDN.
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // Esto se está ejecutando en localhost. Comprobemos si un service worker aún existe o no.
        checkValidServiceWorker(swUrl, config);

        // Añadir algunos logs adicionales para localhost, apuntando a los desarrolladores a la
        // documentación del service worker/PWA.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'Esta aplicación web está siendo servida primero en caché por un ' +
              'service worker. Para saber más, visita https://cra.link/PWA'
          );
        });
      } else {
        // No es localhost. Simplemente registrar el service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // En este punto, el contenido precargado actualizado ha sido obtenido,
              // pero el service worker anterior seguirá sirviendo el contenido anterior
              // hasta que todas las pestañas del cliente estén cerradas.
              console.log(
                'Nuevo contenido está disponible y se usará cuando todas ' +
                  'las pestañas para esta página estén cerradas. Ver https://cra.link/PWA.'
              );

              // Ejecutar callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // En este punto, todo ha sido precargado.
              // Es el momento perfecto para mostrar un
              // "El contenido está almacenado en caché para uso sin conexión." mensaje.
              console.log('El contenido está almacenado en caché para uso sin conexión.');

              // Ejecutar callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('Error durante el registro del service worker:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Comprobar si el service worker se puede encontrar. Si no puede recargar la página.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response) => {
      // Asegurarse de que el service worker existe, y que realmente estamos obteniendo un archivo JS.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No se encontró service worker. Probablemente una aplicación diferente. Recargar la página.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker encontrado. Proceder normalmente.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log('No se encontró conexión a internet. La app se está ejecutando en modo offline.');
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
