import {
  alerta,
  correo,
  empresa,
  formulario,
  nombre,
  telefono,
} from "./selectores";

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

export function validarCliente(e: Event) {
  e.preventDefault();

  // validar todos los inputs del formulario
  if (nombre === "" || correo === "" || telefono === "" || empresa === "") {
    imprimirAlerta("Todos los campos son obligatorios", "error");

    return;
  }
}

function imprimirAlerta(mensaje: string, tipo: string) {
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
        "border-gree-400",
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
