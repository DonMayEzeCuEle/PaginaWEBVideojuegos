document.addEventListener('DOMContentLoaded', () => {
    const inputBusqueda = document.getElementById('busqueda-juego');
    const grid = document.querySelector('.game-grid');
    const carousel = document.querySelector('.game-carousel'); // Carrusel
    const empiezaAJugar = document.querySelector('h1'); // Título "¡Empieza a Jugar!"
    
    // Juegos iniciales (los que están en el HTML)
    const juegosIniciales = Array.from(grid.children);

    // Función para manejar la visualización de resultados de búsqueda
    inputBusqueda.addEventListener('input', function () {
        const termino = inputBusqueda.value.trim();

        if (termino === '') {
            // Si no hay búsqueda, mostrar todo el contenido original
            carousel.style.display = 'block'; // Mostrar carrusel
            empiezaAJugar.style.display = 'block'; // Mostrar sección de juegos populares
            grid.innerHTML = ''; // Limpiar el grid
            juegosIniciales.forEach(juego => grid.appendChild(juego)); // Volver a agregar los juegos iniciales
            return;
        }

        // Ocultar el carrusel y la sección de juegos populares
        carousel.style.display = 'none';
        empiezaAJugar.style.display = 'none';

        fetch(`php/buscar_juegos.php?query=${encodeURIComponent(termino)}`)
            .then(response => response.json())
            .then(data => {
                grid.innerHTML = ''; // Limpiar cualquier contenido previo en el grid

                if (data.length === 0) {
                    grid.innerHTML = '<p>No se encontraron juegos.</p>';
                    return;
                }

                // Mostrar solo los juegos que coinciden con la búsqueda
                data.forEach(juego => {
                    const link = document.createElement('a');
                    link.href = juego.url; // Enlace correcto para cada juego
                    link.target = '_blank';
                    link.className = 'game-item';
                    link.style.textDecoration = 'none';
                    link.style.color = 'inherit';

                    link.innerHTML = `
                        <img src="${juego.imagen}" alt="${juego.titulo}">
                        <p>${juego.titulo}</p>
                    `;

                    grid.appendChild(link);
                });
            })
            .catch(err => console.error('Error al buscar juegos:', err));
    });
});
