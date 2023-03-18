// formulario completo
export const formulario = document.querySelector(
  "#formulario"
) as HTMLFormElement;

// valores capturados en cada campo del formulario
export const nombre = (document.querySelector("#nombre") as HTMLFormElement)
  .value;
export const correo = (document.querySelector("#correo") as HTMLFormElement)
  .value;
export const telefono = (document.querySelector("#telefono") as HTMLFormElement)
  .value;
export const empresa = (document.querySelector("#empresa") as HTMLFormElement)
  .value;

// mensajes de alerta
export const alerta = document.querySelector("#alerta") as HTMLDivElement;
