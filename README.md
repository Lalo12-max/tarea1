## Descripción
Recetas Culinarias es una aplicación web progresiva (PWA) que permite a los usuarios explorar, buscar y guardar recetas de cocina.
La aplicación funciona tanto en línea como sin conexión, permitiendo acceder a las recetas guardadas en cualquier momento y lugar.

## Características principales
-  Diseño responsive : Adaptado a todo tipo de dispositivos
-  Búsqueda de recetas : Filtrado por nombre
-  Captura de imágenes : Toma fotos de tus propias recetas
-  Notificaciones : Recibe alertas sobre acciones importantes
-  Modo sin conexión : Accede a tus recetas guardadas sin internet
-  Almacenamiento local : Guarda tus recetas favoritas
## Requisitos previos
- Node.js (versión 14.0.0 o superior)
- npm (versión 6.0.0 o superior)

## Instalación
1. Clona este repositorio:
   
   ```
   git clone https://github.com/
   Lalo12-max/tarea1.git
   ```
2. Navega al directorio del proyecto:
   
   ```
   cd tarea1
   ```
3. Instala las dependencias:
   
   ```
   npm install
   ```
## Ejecución
### Modo desarrollo
Para ejecutar la aplicación en modo desarrollo:

```
npm start
```
La aplicación se abrirá automáticamente en tu navegador en http://localhost:3000 .

## Compilación para producción
Para crear una versión optimizada para producción:


```
npm run build
```

Los archivos compilados se guardarán en la carpeta build.

## Despliegue
Para desplegar la aplicación en GitHub Pages:

```
npm run deploy
```

## Dependencias principales
React: Biblioteca para construir interfaces de usuario
React Router: Navegación entre páginas
Workbox: Herramientas para crear aplicaciones web progresivas
Estructura del proyecto
PlainText

## Estructura del proyecto
tarea1/
├── public/               # Archivos públicos y estáticos
├── src/                  # Código fuente
│   ├── assets/           # Recursos (imágenes, iconos)
│   ├── componentes/      # Componentes reutilizables
│   ├── estilos/          # Archivos CSS
│   ├── paginas/          # Páginas principales
│   ├── servicios/        # Lógica de negocio
│   ├── App.js            # Componente principal
│   └── index.js          # Punto de entrada
└── package.json          # Configuración del proyecto


