let DB: IDBDatabase;

export function crearDB() {
  const crearDB = window.indexedDB.open("crm", 1);

  crearDB.onerror = function () {
    console.log("Hubo un error porque no lo soporta el navegador");
  };

  crearDB.onsuccess = function () {
    DB = crearDB.result;
  };

  crearDB.onupgradeneeded = function (e) {
    const db = (e.target as IDBOpenDBRequest).result;

    const objectStore = db.createObjectStore("crm", {
      keyPath: "id",
      autoIncrement: true,
    });

    objectStore.createIndex("nombre", "nombre", { unique: false });
    objectStore.createIndex("email", "email", { unique: true });
    objectStore.createIndex("telefono", "telefono", { unique: false });
    objectStore.createIndex("empresa", "empresa", { unique: false });
    objectStore.createIndex("id", "id", { unique: true });

    console.log("DB lista y creada");
  };
}
