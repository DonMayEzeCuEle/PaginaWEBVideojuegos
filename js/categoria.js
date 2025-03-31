document.addEventListener('DOMContentLoaded', function() {
    // Cargar categorías desde la API
    fetch('api/categorias.php')
        .then(response => response.json())
        .then(categories => {
            const categoryMenu = document.querySelector('.category-menu ul');
            categoryMenu.innerHTML = '';

            categories.forEach(category => {
                const li = document.createElement('li');
                li.className = 'category';
                li.textContent = category.CAT_NOMBRE;
                // Cambiar: En lugar de dataset.id, usamos el nombre para la redirección
                li.dataset.nombre = category.CAT_NOMBRE.toLowerCase().replace(/\s+/g, '-');
                categoryMenu.appendChild(li);
            });

            // Evento para categorías (ahora redirige)
            document.querySelectorAll('.category').forEach(categoryElement => {
                categoryElement.addEventListener('click', function() {
                    const categoryName = this.dataset.nombre;
                    // Redirigir a la página PHP de la categoría
                    window.location.href = `categorias/${categoryName}.php`;
                });
            });
        })
        .catch(error => console.error('Error:', error));
});