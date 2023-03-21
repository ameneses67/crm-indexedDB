import { imprimirAlerta } from "./imprimirAlerta";
import { listadoClientes } from "./selectores";

let DB: IDBDatabase;

conectarDB();

function conectarDB() {
  const abrirConexion = window.indexedDB.open("crm", 1);

  abrirConexion.onerror = function () {
    console.log("Hubo un error al conectar con la bd");
  };

  abrirConexion.onsuccess = function () {
    DB = abrirConexion.result;
  };
}

listadoClientes.addEventListener("click", eliminarRegistro);

function eliminarRegistro(e: Event) {
  if ((e.target as HTMLAnchorElement).classList.contains("eliminar")) {
    const idEliminar = Number((e.target as HTMLAnchorElement).dataset.cliente);

    const confirmar = confirm("¿Deseas eliminar este cliente?");

    if (confirmar) {
      const transaction = DB.transaction(["crm"], "readwrite");
      const objectStore = transaction.objectStore("crm");

      objectStore.delete(idEliminar);

      transaction.oncomplete = function () {
        // quitar del dom
        (e.target as HTMLAnchorElement).parentElement?.parentElement?.remove();

        imprimirAlerta("Cliente eliminado");
      };

      transaction.onerror = function () {
        console.log("Hubo un error al elminar el cliente");
      };
    }
  }
}
