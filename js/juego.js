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
    // Rellenamos el panel del jugador con sus datos
    mostrarPanel(nombre);

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
// ----------------------------------------------------------------------
// calcularEdad: recibe una fecha de nacimiento (objeto Date) y devuelve
// la edad en años cumplidos. (Es la misma función que tienes en script.js)
// ----------------------------------------------------------------------
function calcularEdad(fechaNacimiento) {
    // new Date() sin parámetros crea la fecha y hora de hoy
    const hoy = new Date();

    // getFullYear() devuelve el año con 4 cifras
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

    // getMonth() devuelve el mes de 0 (enero) a 11 (diciembre)
    const mesDiferencia = hoy.getMonth() - fechaNacimiento.getMonth();

    // Si todavía no ha cumplido años este año, restamos 1.
    // getDate() devuelve el día del mes.
    if (mesDiferencia < 0 || (mesDiferencia === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }

    return edad;
}

// ----------------------------------------------------------------------
// mostrarPanel: rellena el panel con el nombre formateado y la edad.
// ----------------------------------------------------------------------
function mostrarPanel(nombre) {
    // charAt(0) coge la primera letra y toUpperCase() la pasa a mayúscula.
    // slice(1) coge el texto desde la segunda letra y toLowerCase() lo pasa
    // a minúsculas. Al unirlos con + obtenemos el nombre con formato
    // ("jAVIER" -> "Javier").
    const nombreFormateado = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();

    // Recuperamos la fecha guardada en sessionStorage (viene como texto "AAAA-MM-DD")
    // y la convertimos en un objeto Date para poder calcular la edad
    const fechaTexto = sessionStorage.getItem("fechaNacimiento");
    const edad = calcularEdad(new Date(fechaTexto));

    // Escribimos los datos en el panel
    document.getElementById("nombreFormateado").textContent = nombreFormateado;
    document.getElementById("edad").textContent = edad;
    // Cambiamos los estilos del panel según el nombre y la edad
    aplicarEstilosPanel(nombre, edad);
}
// ----------------------------------------------------------------------
// aplicarEstilosPanel: cambia los colores del panel según los datos
// del jugador.
//  - Color de FONDO: depende de la primera letra del nombre
//  - Color del TEXTO: depende de la edad
// ----------------------------------------------------------------------
function aplicarEstilosPanel(nombre, edad) {
    // Guardamos el panel en una variable para no buscarlo varias veces
    const panel = document.getElementById("panel");

    // Primera letra del nombre, en minúscula para compararla fácilmente
    const inicial = nombre.charAt(0).toLowerCase();

    // includes() comprueba si un texto contiene otro.
    // Aquí miramos si la inicial está dentro del texto de las vocales.
    if ("aeiouáéíóú".includes(inicial)) {
        // Nombre que empieza por vocal -> fondo verde
        panel.style.backgroundColor = "#1f6f5c";
    } else {
        // Nombre que empieza por consonante -> fondo morado
        panel.style.backgroundColor = "#7a3e8e";
    }

    // Color del texto según la edad.
    // La propiedad .style cambia el CSS directamente desde JavaScript.
    if (edad < 18) {
        // Menor de edad -> texto amarillo
        panel.style.color = "#ffe066";
    } else {
        // Mayor de edad -> texto blanco
        panel.style.color = "#ffffff";
    }
}