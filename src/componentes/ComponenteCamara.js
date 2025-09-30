import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/ComponenteCamara.css';

const ComponenteCamara = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [tienePhoto, setTienePhoto] = useState(false);
  const [errorCamara, setErrorCamara] = useState(false);
  const navegar = useNavigate();

  useEffect(() => {
    obtenerVideo();
    
    return () => {
      const currentVideo = videoRef.current;
      if (currentVideo && currentVideo.srcObject) {
        const pistas = currentVideo.srcObject.getTracks();
        pistas.forEach(pista => pista.stop());
      }
    };
  }, []);

  const obtenerVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 1280, height: 720 }, audio: false })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error("Error al acceder a la cámara:", err);
        setErrorCamara(true);
      });
  };

  const tomarPhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    const ancho = 320;
    const alto = video.videoHeight / (video.videoWidth / ancho);

    canvas.width = ancho;
    canvas.height = alto;

    const contexto = canvas.getContext('2d');
    contexto.drawImage(video, 0, 0, ancho, alto);
    setTienePhoto(true);
    

    const pistas = video.srcObject.getTracks();
    pistas.forEach(pista => pista.stop());
  };

  const cerrarPhoto = () => {
    setTienePhoto(false);
    obtenerVideo();
  };

  const guardarPhoto = () => {
    alert('Foto guardada exitosamente');
    navegar('/');
  };

  return (
    <div className="contenedor-camara">
      <div className="cabecera-camara">
        <button onClick={() => navegar('/')} className="boton-volver">
          <i className="fas fa-arrow-left"></i>
        </button>
        <h2>Captura tu receta</h2>
      </div>

      {errorCamara ? (
        <div className="error-camara">
          <p>No se pudo acceder a la cámara. Por favor, verifica los permisos.</p>
          <button onClick={() => navegar('/')} className="boton-volver">
            Volver al inicio
          </button>
        </div>
      ) : (
        <div className="contenido-camara">
          <div className={`contenedor-video ${tienePhoto ? 'oculto' : ''}`}>
            <video ref={videoRef}></video>
            <button onClick={tomarPhoto} className="boton-captura">
              <i className="fas fa-camera"></i>
            </button>
          </div>

          <div className={`contenedor-resultado ${tienePhoto ? '' : 'oculto'}`}>
            <canvas ref={canvasRef}></canvas>
            <div className="acciones-photo">
              <button onClick={cerrarPhoto} className="boton-rehacer">
                <i className="fas fa-redo"></i> Volver a tomar
              </button>
              <button onClick={guardarPhoto} className="boton-guardar">
                <i className="fas fa-save"></i> Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComponenteCamara;