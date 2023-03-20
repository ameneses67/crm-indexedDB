import { correo, empresa, formulario, nombre, telefono } from "./selectores";
import { imprimirAlerta } from "./imprimirAlerta";
import { crearNuevoCliente } from "./nuevoCliente";

export interface ICliente {
  nombre: string;
  correo: string;
  telefono: string;
  empresa: string;
  id: number;
}

export function validarCliente(e: Event) {
  e.preventDefault();

  // validar todos los inputs del formulario
  if (
    nombre.value === "" ||
    correo.value === "" ||
    telefono.value === "" ||
    empresa.value === ""
  ) {
    imprimirAlerta("Todos los campos son obligatorios", "error");

    return;
  }

  // crear objeto con la información capturada en el formulario
  const cliente: ICliente = {
    nombre: nombre.value,
    correo: correo.value,
    telefono: telefono.value,
    empresa: empresa.value,
    id: Date.now(),
  };

  crearNuevoCliente(cliente);
}
