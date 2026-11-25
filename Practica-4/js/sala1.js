// Modelo inicial: propiedades simples, objetos anidados y una función.
const cajaInicial = {
  nombre: "Caja fuerte del despacho",
  abierta: false,
  intentos: 0,
  cerradura: {
    codigo: "472",
    longitud: 3
  },
  contenido: {
    nombre: "Llave de la segunda sala",
    recogido: false
  },
  comprobarCodigo: function (codigo) {
    return codigo === this.cerradura.codigo;
  }
};

function crearCaja() {
  // Object.assign hace una copia superficial y conserva la función.
  const copia = Object.assign({}, cajaInicial);
  // Copiamos también los objetos anidados para no modificar el modelo inicial.
  copia.cerradura = Object.assign({}, cajaInicial.cerradura);
  copia.contenido = Object.assign({}, cajaInicial.contenido);
  return copia;
}

let caja = crearCaja();

const formulario = document.getElementById("formulario");
const entrada = document.getElementById("codigo");
const botonAbrir = document.getElementById("abrir");
const estado = document.getElementById("estado");
const intentos = document.getElementById("intentos");
const mensaje = document.getElementById("mensaje");
const siguiente = document.getElementById("siguiente");
const reiniciar = document.getElementById("reiniciar");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();
  if (caja.abierta) return;

  try {
    const codigo = entrada.value.trim();
    // Control de excepciones: una entrada inválida no cuenta como intento.
    if (codigo.length !== caja.cerradura.longitud || !/^\d+$/.test(codigo)) {
      throw new Error("Introduce exactamente tres cifras del 0 al 9.");
    }

    entrada.removeAttribute("aria-invalid");
    caja.intentos++;
    intentos.textContent = caja.intentos;

    if (caja.comprobarCodigo(codigo)) {
      caja.abierta = true;
      caja.contenido.recogido = true;
      estado.textContent = "Estado: abierta";
      mensaje.textContent = "¡Has encontrado la llave! Ya puedes pasar a la segunda sala.";
      mensaje.dataset.tipo = "exito";
      entrada.disabled = true;
      botonAbrir.disabled = true;
      siguiente.hidden = false;
      siguiente.focus();
    } else {
      mensaje.textContent = "El código no es correcto. Revisa las pistas y su orden.";
      mensaje.dataset.tipo = "error";
      entrada.select();
    }
  } catch (error) {
    mensaje.textContent = error.message;
    mensaje.dataset.tipo = "error";
    entrada.setAttribute("aria-invalid", "true");
    entrada.focus();
  }
});

reiniciar.addEventListener("click", function () {
  caja = crearCaja();
  formulario.reset();
  entrada.disabled = false;
  entrada.removeAttribute("aria-invalid");
  botonAbrir.disabled = false;
  estado.textContent = "Estado: cerrada";
  intentos.textContent = "0";
  mensaje.textContent = "Sala reiniciada. Puedes volver a intentarlo.";
  delete mensaje.dataset.tipo;
  siguiente.hidden = true;
  entrada.focus();
});
