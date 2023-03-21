import { imprimirAlerta } from "./imprimirAlerta";
import type { ICliente } from "./validarCliente";
import {
  nombreInput,
  correoInput,
  telefonoInput,
  empresaInput,
  formulario,
} from "./selectores";

formulario.addEventListener("submit", validarCliente);

let DB: IDBDatabase;

conectarDB();

function conectarDB() {
  const abrirConexion = window.indexedDB.open("crm", 1);

  abrirConexion.onerror = function () {
    console.log("Hubo un error");
  };

  abrirConexion.onsuccess = function () {
    DB = abrirConexion.result;
  };
}

export function validarCliente(e: Event) {
  e.preventDefault();

  // validar todos los inputs del formulario
  if (
    nombreInput.value === "" ||
    correoInput.value === "" ||
    telefonoInput.value === "" ||
    empresaInput.value === ""
  ) {
    imprimirAlerta("Todos los campos son obligatorios", "error");

    return;
  }

  // crear objeto con la información capturada en el formulario
  const cliente: ICliente = {
    nombre: nombreInput.value,
    correo: correoInput.value,
    telefono: telefonoInput.value,
    empresa: empresaInput.value,
    id: Date.now(),
  };

  crearNuevoCliente(cliente);
}

// crearNuevoCliente(cliente);
export function crearNuevoCliente(cliente: ICliente) {
  const transaction = DB.transaction(["crm"], "readwrite");

  const objectStore = transaction.objectStore("crm");

  objectStore.add(cliente);

  transaction.onerror = function () {
    imprimirAlerta("Hubo un error", "error");
  };

  transaction.oncomplete = function () {
    imprimirAlerta("Cliente agregado correctamente");

    // redireccionar al listado de los clientes
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  };
}
