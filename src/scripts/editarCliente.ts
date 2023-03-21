import { formulario, parametrosURL } from "./selectores";
import {
  nombreInput,
  correoInput,
  telefonoInput,
  empresaInput,
} from "./selectores";
import type { ICliente } from "./validarCliente";
import { imprimirAlerta } from "./imprimirAlerta";

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

// llenar formulario con los datos del cliente a editar
function llenarFormulario(datosCliente: ICliente) {
  const { nombre, correo, telefono, empresa } = datosCliente;

  nombreInput.value = nombre;
  correoInput.value = correo;
  telefonoInput.value = telefono;
  empresaInput.value = empresa;
}

// crear objeto con la información capturada en el formulario
const cliente: ICliente = {
  nombre: nombreInput.value,
  correo: correoInput.value,
  telefono: telefonoInput.value,
  empresa: empresaInput.value,
  id: Number(idCliente),
};

function validarCliente(e: Event) {
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
    id: Number(idCliente),
  };

  actualizarCliente(e);
}

// guardar cambios del cliente editado
function actualizarCliente(e: Event) {
  const transaction = DB.transaction(["crm"], "readwrite");

  const objectStore = transaction.objectStore("crm");

  objectStore.put(cliente);
  console.log(cliente);

  transaction.onerror = function () {
    imprimirAlerta("Hubo un error al actualizar cliente", "error");
  };

  transaction.oncomplete = function () {
    imprimirAlerta("Cliente actualizado correctamente");

    // redireccionar al listado de los clientes
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  };
}
