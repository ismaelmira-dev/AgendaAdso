// Implementa estas funciones:

const aprendices = [
{ id: 1, nombre: "Ana", ficha:
3223874, nota: 4.2 },
{ id: 2, nombre: "Luis", ficha:
3223874, nota: 3.5 },
{ id: 3, nombre: "María", ficha:
3223875, nota: 4.8 }
];

// 1. obtenerAprobados(aprendices)
// Retorna array con nota >= 3.0
const aprobados = aprendices.filter(a => a.nota >= 3.0);
console.log("Aprobados:", aprobados);

// 2. calcularPromedio(aprendices)
// Retorna promedio del grupo
const totalNotas = aprendices.reduce((sum, a) => sum + a.nota, 0);
const promedioGrupo = totalNotas / aprendices.length;
console.log("Promedio grupo:", promedioGrupo.toFixed(2));

// 3. buscarPorNombre(aprendices, nombre)
// Retorna aprendiz que coincida
const buscarPorNombre = (aprendices, nombre) => {
  return aprendices.find(a => a.nombre === nombre);
};
console.log('buscar por nombre: Luis', buscarPorNombre(aprendices, "Luis"));

//  4. obtenerNombres(aprendices)
// Retorna array solo con nombres
const obtenerNombres = (aprendices) => {
  return aprendices.map(a => a.nombre);
};
const nombresAprendices = obtenerNombres(aprendices);
console.log('Nombres aprendices:', nombresAprendices);
