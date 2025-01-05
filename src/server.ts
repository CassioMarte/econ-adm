import dotenv from "dotenv";
import { createApp } from "./app";

dotenv.config(); //se rodar sem pg instalado não funciona 

createApp()
  .then((app) => {
    app.listen(process.env.PORT || 3000, () => {
      console.log("Api running, OK");
    });
  })
  .catch((err) => {
    console.error(`Error initializing the app: ${err}`);
    process.exit(1);
  });

console.log(process.env.PORT);
