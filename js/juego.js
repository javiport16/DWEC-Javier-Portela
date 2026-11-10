// Puntos necesarios para completar la misión
const OBJETIVO = 50;

// Puntuación actual y array con los puntos de cada ataque
let puntuacion = 0;
let historial = [];

document.addEventListener("DOMContentLoaded", iniciarJuego);

function iniciarJuego() {
    // Recuperamos el nombre guardado en la pantalla de perfil
    const nombre = sessionStorage.getItem("nombre");

    // Si no hay jugador, volvemos al perfil
    if (nombre === null) {
        window.location.href = "index.html";
        return;
    }

    document.getElementById("saludo").textContent = "Jugador: " + nombre;
    document.getElementById("objetivo").textContent = OBJETIVO;

    document.getElementById("btnAtacar").addEventListener("click", atacar);
    document.getElementById("btnSalir").addEventListener("click", salir);
}

function atacar() {
    // Número aleatorio entre -5 y 10
    const puntos = Math.floor(Math.random() * 16) - 5;

    // Sumamos los puntos sin dejar que la puntuación baje de 0
    puntuacion = Math.max(0, puntuacion + puntos);

    // Guardamos el ataque en el array
    historial.push(puntos);

    // Actualizamos la pantalla
    document.getElementById("puntuacion").textContent = puntuacion;
    document.getElementById("intentos").textContent = historial.length;
    document.getElementById("historial").textContent = historial.join(", ");

    const resultado = document.getElementById("resultado");
    if (puntos > 0) {
        resultado.textContent = "¡Golpe! +" + puntos + " puntos";
    } else if (puntos < 0) {
        resultado.textContent = "Fallaste: " + puntos + " puntos";
    } else {
        resultado.textContent = "El ataque no tuvo efecto";
    }

    // Comprobamos si se ha completado la misión
    if (puntuacion >= OBJETIVO) {
        terminarMision();
    }
}

function terminarMision() {
    // Calculamos la suma de todos los ataques con un bucle
    let suma = 0;
    for (let i = 0; i < historial.length; i++) {
        suma += historial[i];
    }

    const media = Math.round(suma / historial.length);
    const mejor = Math.max(...historial);

    document.getElementById("btnAtacar").disabled = true;
    document.getElementById("resultado").textContent =
        "¡Misión completada! Mejor ataque: " + mejor + " | Media: " + media;
}

function salir() {
    // Borramos los datos de la sesión y volvemos al perfil
    sessionStorage.clear();
    window.location.href = "index.html";
}