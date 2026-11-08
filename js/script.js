// Edad mínima exigida para jugar
const EDAD_MINIMA = 12;

// Al estar el script en el <head> con "defer", el DOM ya está listo,
// pero usamos DOMContentLoaded para dejarlo explícito.
document.addEventListener("DOMContentLoaded", function () {
    const btnEntrar = document.getElementById("btnEntrar");
    btnEntrar.addEventListener("click", validarPerfil);
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

    // Todo correcto
    mensaje.textContent = "Bienvenido, " + nombre;
}
