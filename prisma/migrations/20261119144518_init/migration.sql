-- CreateTable
CREATE TABLE "Producto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);
