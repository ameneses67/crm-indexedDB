import { formulario } from "./selectores";

export function imprimirAlerta(mensaje: string, tipo?: string) {
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
