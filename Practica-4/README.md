# Escape Room — Unidad 4

Juego de escape con tres salas, realizado con HTML, CSS y JavaScript.

## Estado inicial

Este primer commit contiene solamente la estructura del proyecto, las páginas
base y estilos comunes. Los retos, el bloqueo de las salas y la lógica del
juego están pendientes de implementar.

## Organización

- `index.html`: pantalla de inicio.
- `salas/`: una página HTML por sala.
- `css/estilos.css`: estilos comunes.
- `js/sala1.js`, `js/sala2.js`, `js/sala3.js`: lógica de cada sala.
- `js/modulos/`: futuros módulos de clases de la tercera sala.
- `assets/img/`: imágenes del juego.

Los archivos `.gitkeep` permiten conservar las carpetas todavía vacías en Git.

## Cómo abrirlo

Abre la carpeta con Visual Studio Code y sirve `index.html` con Live Server.
Utiliza un servidor local para que los módulos JavaScript puedan cargarse.
No requiere instalación de dependencias.

## Requisitos pendientes del enunciado

- Sala 1: objeto con propiedades de tipos simples, al menos una función y
  objetos anidados; utilizar métodos de clonación de objetos.
- Sala 2: al menos tres métodos de arrays, Map y Set para almacenar pistas,
  operador spread, desestructuración y Array.from para convertir claves o
  valores en un array.
- Sala 3: clases con herencia, propiedades o métodos privados y estáticos;
  guardar todas las clases en módulos e importarlas.
- Controlar excepciones al menos una vez en alguna sala.
- Permitir abrir las salas al resolver sus retos.
- Subir el progreso real a GitHub: mínimo diez commits y al menos uno por
  semana desde la publicación del enunciado.

El desarrollo se hará de forma gradual para poder comprender y justificar el código.
