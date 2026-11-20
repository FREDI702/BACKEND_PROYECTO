require("dotenv/config");

const prisma = require("./src/lib/prisma");

const products = [
  { nombre: "Néctar de Cairo", marca: "Lattafa", categoria: "Unisex", presentacion: "100 ml", precio: 189.9, stock: 12, vendidos: 48 },
  { nombre: "Rosa Imperial", marca: "Nishane", categoria: "Mujer", presentacion: "50 ml", precio: 248, stock: 8, vendidos: 35 },
  { nombre: "Bosque Oscuro", marca: "Dior", categoria: "Hombre", presentacion: "100 ml", precio: 310, stock: 4, vendidos: 61 },
  { nombre: "Brisa de Cítricos", marca: "Chanel", categoria: "Unisex", presentacion: "75 ml", precio: 275.5, stock: 18, vendidos: 22 },
  { nombre: "Ámbar Nocturno", marca: "Yves Saint Laurent", categoria: "Mujer", presentacion: "90 ml", precio: 265, stock: 6, vendidos: 30 },
  { nombre: "Oud Real", marca: "Lattafa", categoria: "Hombre", presentacion: "100 ml", precio: 199.9, stock: 25, vendidos: 47 },
  { nombre: "Vainilla Silvestre", marca: "Carolina Herrera", categoria: "Mujer", presentacion: "80 ml", precio: 215, stock: 14, vendidos: 19 },
  { nombre: "Cuero Nocturno", marca: "Tom Ford", categoria: "Hombre", presentacion: "100 ml", precio: 340, stock: 3, vendidos: 27 },
];

async function main() {
  const names = products.map(({ nombre }) => nombre);
  const existingProducts = await prisma.producto.findMany({
    where: { nombre: { in: names } },
    select: { nombre: true },
  });
  const existingNames = new Set(existingProducts.map(({ nombre }) => nombre));
  const missingProducts = products
    .filter(({ nombre }) => !existingNames.has(nombre))
    .map((product) => ({ ...product, fecha: new Date() }));

  if (missingProducts.length > 0) {
    await prisma.producto.createMany({ data: missingProducts });
  }

  console.log(`Productos de ejemplo agregados: ${missingProducts.length}`);
}

main()
  .catch((error) => {
    console.error("No se pudieron cargar los productos de ejemplo:", error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
