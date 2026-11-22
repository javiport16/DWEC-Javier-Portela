// Edad mínima exigida para jugar
const EDAD_MINIMA = 12;

// Al estar el script en el <head> con "defer", el DOM ya está listo,
// pero usamos DOMContentLoaded para dejarlo explícito.
document.addEventListener("DOMContentLoaded", function () {
    const btnEntrar = document.getElementById("btnEntrar");
    btnEntrar.addEventListener("click", validarPerfil);
    // Si hay una cookie con el último jugador, rellenamos el campo del nombre
    const ultimoJugador = leerCookie("ultimoJugador");
    if (ultimoJugador !== "") {
        document.getElementById("nombre").value = ultimoJugador;
    }
});

// Calcula la edad en años a partir de una fecha de nacimiento (objeto Date)
function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

    // Si aún no ha cumplido años este año, restamos 1
    const mesDiferencia = hoy.getMonth() - fechaNacimiento.getMonth();
    if (mesDiferencia < 0 || (mesDiferencia === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }
    return edad;
}

// Comprueba nombre y fecha; si algo falla muestra "Acceso denegado"
function validarPerfil() {
    const nombre = document.getElementById("nombre").value.trim();
    const fechaTexto = document.getElementById("fechaNacimiento").value;
    const mensaje = document.getElementById("mensaje");

    // 1. Nombre vacío
    if (nombre === "") {
        mensaje.textContent = "Acceso denegado";
        return;
    }

    // 2. Fecha vacía o inválida
    const fecha = new Date(fechaTexto);
    if (fechaTexto === "" || isNaN(fecha.getTime())) {
        mensaje.textContent = "Acceso denegado";
        return;
    }

    // 3. Fecha anterior a hoy
    if (fecha >= new Date()) {
        mensaje.textContent = "Acceso denegado";
        return;
    }

    // 4. Edad mínima
    if (calcularEdad(fecha) < EDAD_MINIMA) {
        mensaje.textContent = "Acceso denegado";
        return;
    }

    // Todo correcto: guardamos los datos y pasamos a la pantalla del juego
    sessionStorage.setItem("nombre", nombre);
    sessionStorage.setItem("fechaNacimiento", fechaTexto);
    // Guardamos una cookie con el nombre durante 7 días
    guardarCookie("ultimoJugador", nombre, 7);
    window.location.href = "juego.html";
}
// ----------------------------------------------------------------------
// guardarCookie: crea una cookie con un nombre, un valor y una duración
// en días.
// ----------------------------------------------------------------------
function guardarCookie(nombre, valor, dias) {
    // Calculamos la fecha de caducidad: hoy + los días indicados.
    // setDate() cambia el día del mes de un objeto Date.
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + dias);

    // Una cookie se escribe como texto en document.cookie:
    //   nombre=valor; expires=fecha; path=/
    // encodeURIComponent() evita problemas con espacios o tildes y
    // toUTCString() da la fecha en el formato que exigen las cookies.
    document.cookie = nombre + "=" + encodeURIComponent(valor) +
                      "; expires=" + fecha.toUTCString() + "; path=/";
}

// ----------------------------------------------------------------------
// leerCookie: busca una cookie por su nombre y devuelve su valor
// (o "" si no existe).
// ----------------------------------------------------------------------
function leerCookie(nombre) {
    // document.cookie devuelve todas las cookies juntas en un solo texto:
    //   "cookie1=valor1; cookie2=valor2"
    // split("; ") lo convierte en un array con una cookie en cada posición.
    const cookies = document.cookie.split("; ");

    for (let i = 0; i < cookies.length; i++) {
        // split("=") separa cada cookie en [nombre, valor]
        const partes = cookies[i].split("=");

        if (partes[0] === nombre) {
            // decodeURIComponent() deshace el encodeURIComponent de guardarCookie
            return decodeURIComponent(partes[1]);
        }
    }

    // Si no hemos encontrado la cookie
    return "";
}