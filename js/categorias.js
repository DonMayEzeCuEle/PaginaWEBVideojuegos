document.addEventListener('DOMContentLoaded', function () {
    fetch('php/obtener_categorias.php')
        .then(response => response.json())
        .then(categorias => {
            const lista = document.getElementById('lista-categorias');
            lista.innerHTML = '';

            categorias.forEach(cat => {
                const li = document.createElement('li');
                li.textContent = cat;
                lista.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error al cargar las categorías:', error);
            const lista = document.getElementById('lista-categorias');
            lista.innerHTML = '<li>Error al cargar categorías</li>';
        });
});
