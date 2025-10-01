import { AppError } from "../utils/appError.js";

export function errorMiddleware(err, req, res, next) {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  res.status(500).json({ error: "Internal Server Error" });
}
