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

});
