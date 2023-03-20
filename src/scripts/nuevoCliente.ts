import { imprimirAlerta } from "./imprimirAlerta";
import type { ICliente } from "./validarCliente";

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
