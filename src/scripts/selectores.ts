// formulario
export const formulario = document.querySelector(
  "#formulario"
) as HTMLFormElement;

// valores capturados en cada campo del formulario
export const nombreInput = document.querySelector(
  "#nombre"
) as HTMLInputElement;
export const correoInput = document.querySelector(
  "#correo"
) as HTMLInputElement;
export const telefonoInput = document.querySelector(
  "#telefono"
) as HTMLInputElement;
export const empresaInput = document.querySelector(
  "#empresa"
) as HTMLInputElement;

// tabla clientes
export const listadoClientes = document.querySelector(
  "#listado-clientes"
) as HTMLTableElement;

// buscar parámetros en la url
export const parametrosURL = new URLSearchParams(window.location.search);
