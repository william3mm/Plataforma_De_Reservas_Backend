import app from "./app.js";

try {
  app.listen(3004, () => console.log("ouvindo..."));
} catch (err) {
  console.error("Erro ao iniciar o servidor:", err);
}
