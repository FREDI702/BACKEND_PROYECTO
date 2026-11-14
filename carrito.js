const productos = [
  { nombre: "Mango", precio: 3 },
  { nombre: "Pacay", precio: 1 },
  { nombre: "Manzana", precio: 2 },
  { nombre: "Pera", precio: 4 },
];

console.log("Cantidad de productos:", productos.length);
console.log("Primer producto:", productos[0]);
console.log("Último producto:", productos[productos.length - 1]);

let total = 0;

for (let i = 0; i < productos.length; i++) {
  total += productos[i].precio;
}

console.log("Total:", total);
