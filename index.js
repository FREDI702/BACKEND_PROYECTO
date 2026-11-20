const express = require("express");
const swaggerUi = require("swagger-ui-express");
const openapi = require("./openapi");
const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapi));

app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

app.get("/api/saludo", (req, res) => {
  res.json({ mensaje: "Hola desde mi API" });
});
//NIVEL 1
app.get("/api/yo", (req, res) => {
  res.json({
    nombre: "FREDI",
    carrera: "Ingeniero de software",
  });
});
//NIVEL 2
app.get("/api/edad/:anio", (req, res) => {
  const anioNacimiento = Number(req.params.anio);
  const anioActual = new Date().getFullYear();

  if (
    !/^\d{4}$/.test(req.params.anio) ||
    !Number.isInteger(anioNacimiento) ||
    anioNacimiento < 1900 ||
    anioNacimiento > anioActual
  ) {
    return res.status(400).json({
      error: `El año debe ser un número entre 1900 y ${anioActual}.`,
    });
  }

  res.json({
    anioNacimiento,
    edad: anioActual - anioNacimiento,
    aproximada: true,
  });
});

app.listen(PORT, () => console.log(`API lista en el puerto ${PORT}`));
