let contactos = [];

// 1. agregarContacto(nombre, tel,correo)
// Agrega al array con ID único
const agregarContacto = (nombre, tel, correo) => {
  const nuevoContacto = {
    id: Date.now(),
    nombre,
    tel,
    correo
  };

  contactos = [...contactos, nuevoContacto];

  console.log("✔ Contacto agregado:", nuevoContacto);
  return nuevoContacto;
};

// 2. eliminarContacto(id)
// Remueve del array
const eliminarContacto = (id) => {
  const idNumber = Number(id);
  const longitudInicial = contactos.length;

  contactos = contactos.filter(c => c.id !== idNumber);

  if (contactos.length === longitudInicial) {
    console.log("⚠ Contacto no encontrado");
  } else {
    console.log("🗑 Contacto eliminado");
  }
};

// 3. buscarContacto(termino)
// Busca en nombre o correo
const buscarContacto = (termino) => {
  return contactos.filter(c =>
    c.nombre.toLowerCase().includes(termino.toLowerCase()) ||
    c.correo.toLowerCase().includes(termino.toLowerCase())
  );
};

// 4. actualizarContacto(id, datos)
// Modifica contacto existente
const actualizarContacto = (id, datos) => {
  contactos = contactos.map(c =>
    c.id === id
      ? { ...c, ...datos }
      : c
  );

  console.log("✔ Contacto actualizado");
};

// 5. exportarJSON(contactos)
// Convierte a JSON string
const exportarJSON = (contactos) => {
  return JSON.stringify(contactos, null, 2);
};

agregarContacto("Ana", "3001111111", "ana@gmail.com");
agregarContacto("Luis", "3002222222", "luis@gmail.com");

console.log("Buscar 'ana':", buscarContacto("ana"));

const id = contactos[0].id;
actualizarContacto(id, { tel: "3009999999" });

console.log("JSON:", exportarJSON(contactos));

eliminarContacto(id);
