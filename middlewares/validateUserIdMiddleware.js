import { AppError } from "../utils/appError.js";

export function validateUserIdMiddleware(req, res, next) {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return next(new AppError("Invalid user id", 400));
  }

  req.params.id = Number(id);
  next();
}
