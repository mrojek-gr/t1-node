import { initDb } from "./db/index.js";
import app from "./app.js";

async function startServer() {
  try {
    await initDb();

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is listening http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to run server:", err.message);
    process.exit(1);
  }
}

startServer();
