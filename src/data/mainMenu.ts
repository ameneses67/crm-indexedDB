export interface ImainMenu {
  title: string;
  path: string;
}

export const mainMenu: ImainMenu[] = [
  {
    title: "Clientes",
    path: "/",
  },
  {
    title: "Nuevo Cliente",
    path: "/nuevo-cliente/",
  },
];
