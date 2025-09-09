import express from "express";
import cors from "cors";
import dotenv from "dotenv";
const app = express();

app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

export default app;
