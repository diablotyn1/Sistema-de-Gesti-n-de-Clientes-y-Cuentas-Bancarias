import axios from 'axios';

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // El servidor respondió con un código de error
      console.error('Error de respuesta:', error.response.data);
      
      // Personalizar mensajes de error
      if (error.response.status === 404) {
        error.message = 'Recurso no encontrado';
      } else if (error.response.status === 400) {
        error.message = error.response.data.message || 'Datos inválidos';
      } else if (error.response.status === 500) {
        error.message = 'Error del servidor';
      }
    } else if (error.request) {
      // La petición se hizo pero no hubo respuesta
      console.error('Error de red:', error.request);
      error.message = 'No se pudo conectar con el servidor';
    } else {
      // Algo pasó al configurar la petición
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;