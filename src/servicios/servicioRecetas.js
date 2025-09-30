
const RECETAS_EJEMPLO = [
  {
    id: 1,
    titulo: 'Pasta Carbonara',
    imagen: '/logo.png', 
    tiempo: 30,
    dificultad: 'Media',
    porciones: 4,
    ingredientes: [
      '400g de espaguetis',
      '200g de panceta o bacon',
      '4 huevos grandes',
      '100g de queso parmesano rallado',
      'Pimienta negra recién molida',
      'Sal al gusto'
    ],
    instrucciones: [
      'Cocer la pasta en agua con sal siguiendo las instrucciones del paquete.',
      'Mientras tanto, cortar la panceta en trozos pequeños y dorarla en una sartén.',
      'En un bol, batir los huevos con el queso parmesano y pimienta negra.',
      'Escurrir la pasta y mezclarla inmediatamente con la panceta.',
      'Retirar del fuego y añadir la mezcla de huevo, removiendo rápidamente.',
      'Servir inmediatamente con más queso parmesano por encima.'
    ]
  },
  {
    id: 2,
    titulo: 'Ensalada César',
    imagen: '/logo.png', 
    tiempo: 20,
    dificultad: 'Fácil',
    porciones: 2,
    ingredientes: [
      '1 lechuga romana',
      '100g de pollo a la plancha',
      '50g de queso parmesano',
      'Crutones de pan',
      '2 cucharadas de salsa César',
      'Pimienta negra'
    ],
    instrucciones: [
      'Lavar y cortar la lechuga en trozos.',
      'Cortar el pollo en tiras.',
      'Mezclar la lechuga con la salsa César.',
      'Añadir el pollo, los crutones y el queso parmesano.',
      'Servir con pimienta negra por encima.'
    ]
  },
  {
    id: 3,
    titulo: 'Tortilla Española',
    imagen: '/logo.png', 
    tiempo: 40,
    dificultad: 'Media',
    porciones: 4,
    ingredientes: [
      '6 huevos',
      '500g de patatas',
      '1 cebolla',
      'Aceite de oliva',
      'Sal'
    ],
    instrucciones: [
      'Pelar y cortar las patatas en rodajas finas.',
      'Pelar y cortar la cebolla en juliana.',
      'Freír las patatas y la cebolla a fuego lento hasta que estén tiernas.',
      'Batir los huevos y mezclarlos con las patatas y la cebolla.',
      'Cuajar la tortilla en una sartén, dándole la vuelta para que se haga por ambos lados.'
    ]
  }
];


export const obtenerRecetas = async () => {
  try {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(RECETAS_EJEMPLO);
      }, 1000);
    });
  } catch (error) {
    console.error('Error al obtener recetas:', error);
    return obtenerRecetasLocales();
  }
};


export const obtenerRecetasLocales = async () => {
  try {
    const recetasAlmacenadas = localStorage.getItem('recetas');
    if (recetasAlmacenadas) {
      return JSON.parse(recetasAlmacenadas);
    }
    return RECETAS_EJEMPLO;
  } catch (error) {
    console.error('Error al obtener recetas locales:', error);
    return RECETAS_EJEMPLO;
  }
};


export const guardarReceta = async (receta) => {
  try {
    let recetasGuardadas = [];
    const recetasAlmacenadas = localStorage.getItem('recetasGuardadas');
    
    if (recetasAlmacenadas) {
      recetasGuardadas = JSON.parse(recetasAlmacenadas);
    }
    

    if (!recetasGuardadas.some(r => r.id === receta.id)) {
      recetasGuardadas.push(receta);
      localStorage.setItem('recetasGuardadas', JSON.stringify(recetasGuardadas));
    }
    
    return true;
  } catch (error) {
    console.error('Error al guardar receta:', error);
    return false;
  }
};