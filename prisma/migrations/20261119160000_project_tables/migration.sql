-- AlterTable
ALTER TABLE "Producto" ADD COLUMN     "categoria" TEXT,
ADD COLUMN     "imagen" TEXT,
ADD COLUMN     "marca" TEXT,
ADD COLUMN     "precio" DECIMAL(12,2),
ADD COLUMN     "presentacion" TEXT,
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "vendidos" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "contrasenaHash" TEXT NOT NULL,
    "rol" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venta" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER,
    "cliente" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" DECIMAL(12,2) NOT NULL,
    "metodoPago" TEXT NOT NULL,
    "estadoPago" TEXT NOT NULL,

    CONSTRAINT "Venta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetalleVenta" (
    "id" SERIAL NOT NULL,
    "ventaId" INTEGER NOT NULL,
    "productoId" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "precioUnitario" DECIMAL(12,2) NOT NULL,
    "cantidad" INTEGER NOT NULL,

    CONSTRAINT "DetalleVenta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Envio" (
    "id" SERIAL NOT NULL,
    "ventaId" INTEGER NOT NULL,
    "nombreCliente" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Envio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recepcion" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "proveedor" TEXT NOT NULL,

    CONSTRAINT "Recepcion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetalleRecepcion" (
    "id" SERIAL NOT NULL,
    "recepcionId" INTEGER NOT NULL,
    "productoId" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "estadoProducto" TEXT NOT NULL,

    CONSTRAINT "DetalleRecepcion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarritoItem" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "productoId" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,

    CONSTRAINT "CarritoItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Envio_ventaId_key" ON "Envio"("ventaId");

-- CreateIndex
CREATE UNIQUE INDEX "CarritoItem_usuarioId_productoId_key" ON "CarritoItem"("usuarioId", "productoId");

-- AddForeignKey
ALTER TABLE "Venta" ADD CONSTRAINT "Venta_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleVenta" ADD CONSTRAINT "DetalleVenta_ventaId_fkey" FOREIGN KEY ("ventaId") REFERENCES "Venta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleVenta" ADD CONSTRAINT "DetalleVenta_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Envio" ADD CONSTRAINT "Envio_ventaId_fkey" FOREIGN KEY ("ventaId") REFERENCES "Venta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleRecepcion" ADD CONSTRAINT "DetalleRecepcion_recepcionId_fkey" FOREIGN KEY ("recepcionId") REFERENCES "Recepcion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleRecepcion" ADD CONSTRAINT "DetalleRecepcion_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarritoItem" ADD CONSTRAINT "CarritoItem_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarritoItem" ADD CONSTRAINT "CarritoItem_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
