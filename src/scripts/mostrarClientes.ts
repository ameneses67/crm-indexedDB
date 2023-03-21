import { listadoClientes } from "./selectores";

let DB: IDBDatabase | null = null;

export function obtenerClientes() {
  const abrirConexion = window.indexedDB.open("crm", 1);

  abrirConexion.onerror = function () {
    console.log("Hubo un error al abrir la conexión de la bd");
  };

  abrirConexion.onsuccess = function () {
    DB = abrirConexion.result;

    const objectStore = DB.transaction("crm").objectStore("crm");

    objectStore.openCursor().onsuccess = function (e) {
      const cursor = (e.target as IDBRequest).result;

      if (cursor) {
        const { nombre, correo, telefono, empresa, id } = cursor.value;

        listadoClientes.innerHTML += `
          <tr>
            <td class="px-6 py-4 whitespace-nowrap border-b border-gray-200">
              <p class="text-sm leading-5 font-bold text-gray-700">${nombre}</p>
              <p class="text-sm leading-5 text-gray-700">${correo}</p>
            </td>
            <td class="px-6 py-4 whitespace-nowrap border-b border-gray-200">
              <p class="text-sm text-gray-700">${telefono}</p>
            </td>
            <td class="px-6 py-4 whitespace-nowrap border-b border-gray-200">
              <p class="text-sm text-gray-700">${empresa}</p>
            </td>
            <td class="px-6 py-4 whitespace-nowrap border-b border-gray-200">
              <a href="/editar-cliente/?id=${id}" class="text-sm text-teal-600 hover:text-teal-900 mr-5">Editar</a>
              <a href="#" data-cliente="${id}" class="text-sm text-red-600 hover:text-red-900 eliminar">Eliminar</a>
            </td>
          </tr>
        `;

        cursor.continue();
      } else {
        console.log("No hay más registros...");
      }
    };
  };
}
