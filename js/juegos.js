document.addEventListener('DOMContentLoaded', function() {
    // URL del endpoint PHP
    const API_URL = 'http://localhost/PAGINAWEB_GAMES/php/obtener_juegos.php';

    // Función para manejar el clic en los juegos
    function manejarClickJuegos(juegos) {
        // Asignar eventos a imágenes del carrusel
        document.querySelectorAll('.carousel-slide img').forEach(img => {
            const juegoId = img.getAttribute('data-id');
            const juego = juegos.find(j => j.JUE_ID == juegoId);
            
            if (juego) {
                img.style.cursor = 'pointer';
                img.addEventListener('click', () => {
                    if (juego.JUE_URL) {
                        window.open(juego.JUE_URL, '_blank');
                    } else {
                        console.error('URL no disponible para el juego:', juego.JUE_TITULO);
                    }
                });
            }
        });
        
        // Asignar eventos a items del grid
        document.querySelectorAll('.game-item').forEach(item => {
            const juegoId = item.getAttribute('data-id');
            const juego = juegos.find(j => j.JUE_ID == juegoId);
            
            if (juego) {
                item.style.cursor = 'pointer';
                item.addEventListener('click', () => {
                    if (juego.JUE_URL) {
                        window.open(juego.JUE_URL, '_blank');
                    } else {
                        console.error('URL no disponible para el juego:', juego.JUE_TITULO);
                    }
                });
            }
        });
    }

    // Obtener datos de los juegos
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success && data.juegos && data.juegos.length > 0) {
                manejarClickJuegos(data.juegos);
            } else {
                console.error('No se pudieron obtener los juegos o la lista está vacía');
                if (data.message) {
                    console.error('Mensaje del servidor:', data.message);
                }
            }
        })
        .catch(error => {
            console.error('Error al obtener los juegos:', error);
            // Puedes mostrar un mensaje al usuario si lo deseas
            // alert('No se pudieron cargar los juegos. Por favor intenta más tarde.');
        });
});