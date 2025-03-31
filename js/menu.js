document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextBtn = document.querySelector('.right-arrow');
    const prevBtn = document.querySelector('.left-arrow');
    const menuBtn = document.querySelector(".menu-btn");
    const sideMenu = document.querySelector(".side-menu");
    const menuOverlay = document.querySelector(".menu-overlay");
    const categoryBtn = document.querySelector(".category-btn");
    const categoryMenu = document.querySelector(".category-menu");
    const searchIcon = document.querySelector(".search-icon");
    const searchInput = document.querySelector(".search-box input");

    let currentIndex = 0;

    // 🔄 Función para actualizar la posición del carrusel
    const updateSlidePosition = () => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    };

    // ⏩ Mover carrusel
    const moveToSlide = (index) => {
        if (index >= slides.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = slides.length - 1;
        } else {
            currentIndex = index;
        }
        updateSlidePosition();
    };

    nextBtn.addEventListener('click', () => moveToSlide(currentIndex + 1));
    prevBtn.addEventListener('click', () => moveToSlide(currentIndex - 1));

    window.addEventListener('resize', updateSlidePosition);
    updateSlidePosition();

    // 📌 Menú lateral (animación y cierre al hacer clic afuera)
    menuBtn.addEventListener("click", () => {
        sideMenu.classList.add("active");
        menuOverlay.style.display = "block";
        setTimeout(() => {
            menuOverlay.style.opacity = "1";
        }, 10);
    });

    menuOverlay.addEventListener("click", () => {
        sideMenu.classList.remove("active");
        menuOverlay.style.opacity = "0";
        setTimeout(() => {
            menuOverlay.style.display = "none";
        }, 300);
    });

    // 📌 Menú de categorías (con animación hacia abajo)
    categoryBtn.addEventListener("click", () => {
        if (categoryMenu.classList.contains("active")) {
            categoryMenu.style.maxHeight = "0px";
            categoryMenu.style.opacity = "0";
            setTimeout(() => {
                categoryMenu.classList.remove("active");
                categoryMenu.style.display = "none";
            }, 300);
        } else {
            categoryMenu.style.display = "block";
            setTimeout(() => {
                categoryMenu.classList.add("active");
                categoryMenu.style.maxHeight = "200px"; // Ajusta la altura según sea necesario
                categoryMenu.style.opacity = "1";
            }, 10);
        }
    });

    // 🔍 Búsqueda (muestra en consola lo que se busca)
    searchIcon.addEventListener("click", () => {
        console.log("Buscando:", searchInput.value);
    });

    document.addEventListener('DOMContentLoaded', function() {
        // Elementos del DOM
        const menuBtn = document.getElementById('menu-btn');
        const categoriesBtn = document.getElementById('categories-btn');
        const sidebar = document.getElementById('sidebar');
        const categoriesPanel = document.getElementById('categories-panel');
        const closeBtn = document.getElementById('close-btn');
        const overlay = document.getElementById('overlay');
        const searchBtn = document.querySelector('.search-btn');
        const searchInput = document.querySelector('.search-input');
        
        // Abrir menú lateral
        menuBtn.addEventListener('click', function() {
            sidebar.classList.add('open');
            overlay.classList.add('active');
        });
        
        // Abrir panel de categorías
        categoriesBtn.addEventListener('click', function() {
            categoriesPanel.classList.add('open');
            overlay.classList.add('active');
        });
        
        // Cerrar menús
        function closeAllMenus() {
            sidebar.classList.remove('open');
            categoriesPanel.classList.remove('open');
            overlay.classList.remove('active');
        }
        
        // Eventos para cerrar
        closeBtn.addEventListener('click', closeAllMenus);
        overlay.addEventListener('click', closeAllMenus);
        
        // Buscar
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                alert(`Buscando: ${searchTerm}`);
                // Aquí implementarías la búsqueda real
            }
        });
        
        // Buscar al presionar Enter
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
        
        // Manejar clic en categorías
        document.querySelectorAll('.categories-list a').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const category = this.getAttribute('data-category');
                alert(`Mostrando juegos de: ${category}`);
                closeAllMenus();
                // Aquí implementarías la carga de juegos por categoría
            });
        });
        
        // Cerrar al presionar Esc
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeAllMenus();
            }
        });
    });
    

});

