import dotenv from "dotenv";

import app from "./app.js";

dotenv.config();

app.listen(3004, "0.0.0.0", () => {
  console.log("ouvindo...");
});
