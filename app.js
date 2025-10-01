import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import usersRoutes from "./routes/usersRoutes.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", usersRoutes);

app.use(errorMiddleware);

export default app;
