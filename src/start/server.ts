import dotenv from "dotenv";
import app from "./app";

dotenv.config();

app.listen(3004, "0.0.0.0", () => {
  console.log("ouvindo...");
});
