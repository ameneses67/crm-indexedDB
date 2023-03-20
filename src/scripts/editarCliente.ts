import { parametrosURL } from "./selectores";
import { nombre as nombreInput } from "./selectores";
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

// obtener el id del cliente a editar
const idCliente = parametrosURL.get("id");
if (idCliente) {
  setTimeout(() => {
    // se soluciona con async/await pero todavía no sé
    obtenerCliente(idCliente);
  }, 100);
}

// obtener los datos del cliente a editar
function obtenerCliente(id: string) {
  const transaction = DB.transaction(["crm"], "readonly");
  const objectStore = transaction.objectStore("crm");

  const cliente = objectStore.openCursor();
  cliente.onsuccess = function (e) {
    const cursor = (e.target as IDBRequest).result;

    if (cursor) {
      if (cursor.value.id === Number(id)) {
        llenarFormulario(cursor.value);
      }

      cursor.continue();
    }
  };
}

// extraer los datos del cliente a editar y ponerlos en el formulario
function llenarFormulario(datosCliente: ICliente) {
  const { nombre } = datosCliente;

  nombreInput.value = nombre;
}
