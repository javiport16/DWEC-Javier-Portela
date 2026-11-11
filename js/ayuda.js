// ======================================================================
// ayuda.js -> VENTANA ADICIONAL (ayuda.html)
// Lee los datos que le envía juego.html y los muestra, junto con una
// pista aleatoria.
// ======================================================================

// ARRAY con las pistas posibles
const pistas = [
    "Cada ataque da entre -5 y 10 puntos.",
    "La puntuación nunca baja de 0.",
    "Necesitas 50 puntos para completar la misión.",
    "Cuantos más ataques hagas, más cerca estarás del objetivo."
];

// Cuando el HTML está cargado, mostramos la información
document.addEventListener("DOMContentLoaded", mostrarAyuda);

function mostrarAyuda() {
    // window.location.search contiene la parte de la dirección que va
    // desde el "?" (por ejemplo "?nombre=Javier&puntuacion=20&ataques=4").
    // URLSearchParams permite leer cada parámetro por su nombre con get().
    const parametros = new URLSearchParams(window.location.search);

    // Si un parámetro no existe, get() devuelve null; con "|| '-'" ponemos
    // un guion en su lugar (por ejemplo si abren ayuda.html directamente).
    document.getElementById("nombre").textContent = parametros.get("nombre") || "-";
    document.getElementById("puntuacion").textContent = parametros.get("puntuacion") || "-";
    document.getElementById("ataques").textContent = parametros.get("ataques") || "-";

    // Pista aleatoria: Math.random() * longitud del array, redondeado hacia abajo
    // con Math.floor(), da una posición válida del array (de 0 a longitud - 1).
    const posicion = Math.floor(Math.random() * pistas.length);
    document.getElementById("pista").textContent = pistas[posicion];

    // Botón para cerrar la ventana
    document.getElementById("btnCerrar").addEventListener("click", cerrarVentana);
}

function cerrarVentana() {
    // window.close() cierra la ventana actual (funciona porque la abrió el script)
    window.close();
}