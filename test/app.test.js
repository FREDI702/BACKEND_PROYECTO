const assert = require("node:assert/strict");
const { after, before, test } = require("node:test");
const app = require("../index");
const openapi = require("../openapi");
const openapiJson = require("../openapi.json");

let server;
let baseUrl;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test("root redirects to Swagger docs", async () => {
  const response = await fetch(baseUrl, { redirect: "manual" });

  assert.equal(response.status, 302);
  assert.equal(response.headers.get("location"), "/api-docs");
});

test("greeting endpoint returns the documented example", async () => {
  const response = await fetch(`${baseUrl}/api/saludo`);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { mensaje: "Hola desde mi API" });
  assert.deepEqual(
    openapi.paths["/api/saludo"].get.responses["200"].content["application/json"].example,
    { mensaje: "Hola desde mi API" },
  );
});

test("personal information endpoint returns expected fields", async () => {
  const response = await fetch(`${baseUrl}/api/yo`);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    nombre: "FREDI",
    carrera: "Ingeniero de software",
  });
});

test("age endpoint accepts a valid birth year", async () => {
  const response = await fetch(`${baseUrl}/api/edad/2000`);
  const currentYear = new Date().getFullYear();

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    anioNacimiento: 2000,
    edad: currentYear - 2000,
    aproximada: true,
  });
});

test("age endpoint rejects invalid years", async () => {
  const response = await fetch(`${baseUrl}/api/edad/1800`);

  assert.equal(response.status, 400);
  assert.match((await response.json()).error, /1900/);
});

test("Swagger JSON export stays in sync and routes are unique", () => {
  assert.deepEqual(openapiJson, openapi);

  const paths = Object.keys(openapi.paths);
  assert.equal(new Set(paths).size, paths.length);
  assert.deepEqual(paths.sort(), ["/api/edad/{anio}", "/api/saludo", "/api/yo"]);
});
