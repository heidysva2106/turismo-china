const track = document.querySelector(".carrusel-track");
const btnNext = document.querySelector(".derecha");
const btnPrev = document.querySelector(".izquierda");
const carrusel = document.querySelector(".carrusel");

if (track && btnNext && btnPrev && carrusel) {

    let posicion = 0;

    const cards = document.querySelectorAll(".card-carrusel");

    function moverCarrusel() {

        const card = cards[0];

        const estiloTrack =
            window.getComputedStyle(track);

        const gap =
            parseInt(estiloTrack.gap) || 0;

        const cardWidth =
            card.offsetWidth + gap;

        const maxScroll =
            track.scrollWidth - carrusel.offsetWidth - gap;

        let desplazamiento =
            posicion * cardWidth;

        /* EVITA ESPACIO VACÍO AL FINAL */

        if (desplazamiento > maxScroll) {

            desplazamiento = maxScroll;
        }

        track.style.transform =
            `translateX(-${desplazamiento}px)`;

        return {
            cardWidth,
            maxScroll
        };
    }

    btnNext.addEventListener("click", () => {

        const { cardWidth, maxScroll } =
            moverCarrusel();

        const maxPosicion =
            Math.floor(maxScroll / cardWidth);

        if (posicion < maxPosicion) {

            posicion++;

            moverCarrusel();
        }
    });

    btnPrev.addEventListener("click", () => {

        if (posicion > 0) {

            posicion--;

            moverCarrusel();
        }
    });

    /* AUTO SLIDER */

    setInterval(() => {

        const { cardWidth, maxScroll } =
            moverCarrusel();

        const maxPosicion =
            Math.ceil(maxScroll / cardWidth);

        if (posicion < maxPosicion) {

            posicion++;

        } else {

            posicion = 0;
        }

        moverCarrusel();

    }, 3000);

    /* REAJUSTAR EN RESPONSIVE */

    window.addEventListener("resize", () => {

        moverCarrusel();
    });

}

/* ====================================== */
/* CARRUSELES SUBPÁGINA "DÓNDE IR" */
/* ====================================== */

const carruseles = document.querySelectorAll(".carrusel_destinos");

carruseles.forEach((carrusel) => {

    const track = carrusel.querySelector(".slider_track");
    const btnNext = carrusel.querySelector(".derecha");
    const btnPrev = carrusel.querySelector(".izquierda");
    const container = carrusel.querySelector(".slider_container");

    if (!track || !btnNext || !btnPrev || !container) return;

    let posicion = 0;

    const card = carrusel.querySelector(".card_pequena");

    function obtenerMedidas() {

        const estiloTrack =
            window.getComputedStyle(track);

        const gap =
            parseInt(estiloTrack.gap) || 0;

        const cardWidth =
            card.offsetWidth + gap;

        const maxScroll =
            track.scrollWidth - container.offsetWidth;

        return {
            cardWidth,
            maxScroll
        };
    }

    btnNext.addEventListener("click", () => {

        const { cardWidth, maxScroll } =
            obtenerMedidas();

        const siguiente =
            (posicion + 1) * cardWidth;

        if (siguiente >= maxScroll) {

            track.style.transform =
                `translateX(-${maxScroll}px)`;

            posicion =
                Math.ceil(maxScroll / cardWidth);

            return;
        }

        posicion++;

        track.style.transform =
            `translateX(-${posicion * cardWidth}px)`;
    });

    btnPrev.addEventListener("click", () => {

        const { cardWidth } =
            obtenerMedidas();

        if (posicion > 0) {

            posicion--;
        }

        track.style.transform =
            `translateX(-${posicion * cardWidth}px)`;
    });

    window.addEventListener("resize", () => {

        const { cardWidth, maxScroll } =
            obtenerMedidas();

        let desplazamiento =
            posicion * cardWidth;

        if (desplazamiento > maxScroll) {

            desplazamiento = maxScroll;
        }

        track.style.transform =
            `translateX(-${desplazamiento}px)`;
    });

});

/* ====================================== */
/* MENÚ DESPLEGABLE */
/* ====================================== */

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {

        nav.classList.toggle("activo");
        console.log(nav.classList.contains("activo"));

    });

}

const menus =
    document.querySelectorAll(".menu-desplegable");

menus.forEach(menu => {

    const submenu =
        menu.querySelector(".submenu");

    menu.addEventListener("mouseover", () => {

        submenu.style.opacity = "1";
        submenu.style.visibility = "visible";
        submenu.style.transform = "translateY(0)";

    });

    menu.addEventListener("mouseout", () => {

        submenu.style.opacity = "0";
        submenu.style.visibility = "hidden";
        submenu.style.transform = "translateY(15px)";

    });

});

const submenuToggles =
    document.querySelectorAll(".submenu-toggle");

submenuToggles.forEach(toggle => {

    toggle.addEventListener("click", (e) => {

        if (window.innerWidth <= 1024) {

            e.preventDefault();

            const submenu =
                toggle.nextElementSibling;

            submenu.classList.toggle("abierto");

        }

    });

});
/* ====================================== */
/* MENSAJE SEGÚN LA HORA */
/* ====================================== */

const mensaje =
    document.querySelector("#mensaje-bienvenida");

const hora =
    new Date().getHours();

if (mensaje) {

    if (hora < 12) {

        mensaje.textContent =
            "☀️ Buenos días, explora China.";

    }

    else if (hora < 18) {

        mensaje.textContent =
            "🌤️ Buenas tardes, descubre nuevos destinos.";

    }

    else {

        mensaje.textContent =
            "🌙 Buenas noches, planea tu próxima aventura.";

    }


}
/* ====================================== */
/* MENSAJE SEGÚN IDIOMA */
/* ====================================== */

const selectorIdioma =
    document.querySelector("#selector-idioma");

const mensajeIdioma =
    document.querySelector("#mensaje-idioma");

if (selectorIdioma && mensajeIdioma) {

    mensajeIdioma.textContent =
        "🥮 Bienvenido a la experiencia cultural de China.";

    selectorIdioma.addEventListener("change", () => {

        if (selectorIdioma.value === "es") {

            mensajeIdioma.textContent =
                "🥮 Bienvenido a la experiencia cultural de China.";

        }

        else if (selectorIdioma.value === "en") {

            mensajeIdioma.textContent =
                "🥮 Welcome to the cultural experience of China.";

        }

    });

}
