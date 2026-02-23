// Implementa estas funciones:
// 1. obtenerDisponibles(productos)
// 3 Productos con stock > 0

// 3. aplicarDescuento(productos, porcentaje)
// 3 Reduce precios X%


const productos = [
{ nombre: "Laptop", precio: 1200000,
stock: 5 },
{ nombre: "Mouse", precio: 35000,
stock: 0 },
{ nombre: "Teclado", precio: 85000,
stock: 12 }
];

// 1. obtenerDisponibles(productos)
// Productos con stock > 0
const obtenerDisponibles = (productos) => {
  return productos.filter(p => p.stock > 0);
};
console.log('Productos disponibles:', obtenerDisponibles(productos))

// 2. calcularInventario(productos)
// Valor total del inventario

const calcularInventario = (productos) => {
  return productos.reduce(
    (total, p) => total + (p.precio * p.stock),
    0
  );
};
console.log("Valor total inventario:", calcularInventario(productos));

// 3. aplicarDescuento(productos, porcentaje)
// Reduce precios X%
const aplicarDescuento = (productos, porcentaje) => {
  return productos.map(p => ({
    ...p,
    precio: p.precio - (p.precio * porcentaje / 100)
  }));
};
console.log("Con descuento 10%:", aplicarDescuento(productos, 10));

// 4. ordenarPorPrecio(productos)
// Array ordenado menor a mayor
const ordenarPorPrecio = (productos) => {
  return [...productos].sort((a, b) => a.precio - b.precio);
};
console.log("Ordenados por precio:", ordenarPorPrecio(productos));

