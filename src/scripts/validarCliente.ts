// import {
//   correoInput,
//   empresaInput,
//   nombreInput,
//   telefonoInput,
// } from "./selectores";
// import { imprimirAlerta } from "./imprimirAlerta";
// import { crearNuevoCliente } from "./nuevoCliente";

export interface ICliente {
  nombre: string;
  correo: string;
  telefono: string;
  empresa: string;
  id: number;
}

// export function validarCliente(e: Event) {
//   e.preventDefault();

//   // validar todos los inputs del formulario
//   if (
//     nombreInput.value === "" ||
//     correoInput.value === "" ||
//     telefonoInput.value === "" ||
//     empresaInput.value === ""
//   ) {
//     imprimirAlerta("Todos los campos son obligatorios", "error");

//     return;
//   }

//   // crear objeto con la información capturada en el formulario
//   const cliente: ICliente = {
//     nombre: nombreInput.value,
//     correo: correoInput.value,
//     telefono: telefonoInput.value,
//     empresa: empresaInput.value,
//     id: Date.now(),
//   };

//   crearNuevoCliente(cliente);
// }
