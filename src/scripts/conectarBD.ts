import { correo, empresa, formulario, nombre, telefono } from "./selectores";

let DB: IDBDatabase;

export function conectarDB() {
  const abrirConexion = window.indexedDB.open("crm", 1);

  abrirConexion.onerror = function () {
    console.log("Hubo un error");
  };

  abrirConexion.onsuccess = function () {
    DB = abrirConexion.result;
  };
}

interface ICliente {
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

function imprimirAlerta(mensaje: string, tipo?: string) {
  const alerta = document.querySelector(".alerta");

  if (!alerta) {
    const divAlerta = document.createElement("div");
    divAlerta.classList.add("rounded", "text-center", "alerta");
    if (tipo === "error") {
      divAlerta.classList.add(
        "py-2",
        "border",
        "bg-red-100",
        "border-red-400",
        "text-red-700"
      );
    } else {
      divAlerta.classList.add(
        "py-2",
        "border",
        "bg-green-100",
        "border-green-400",
        "text-green-700"
      );
    }

    divAlerta.textContent = mensaje;

    formulario.appendChild(divAlerta);

    setTimeout(() => {
      divAlerta.remove();
    }, 3000);
  }
}

function crearNuevoCliente(cliente: ICliente) {
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
