import { AppError } from "./appError.js";

export const validateDate = (date) => {
  if (!date) return new Date().toISOString().slice(0, 10);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new AppError("Date must be in yyyy-mm-dd format", 400);
  }

  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) {
    throw new AppError("Invalid date", 400);
  }

  return date;
};
