import { AppError } from "../utils/appError.js";

export function validateLogsQuery(req, res, next) {
  const { from, to, limit } = req.query;

  if (limit && (isNaN(Number(limit)) || Number(limit) <= 0)) {
    return next(new AppError("Limit must be a positive number", 400));
  }

  if (from && isNaN(new Date(from).getTime())) {
    return next(new AppError("Invalid 'from' date", 400));
  }

  if (to && isNaN(new Date(to).getTime())) {
    return next(new AppError("Invalid 'to' date", 400));
  }

  next();
}
