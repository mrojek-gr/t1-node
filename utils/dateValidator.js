export const validateDate = (date) => {
  if (!date) return new Date().toISOString().slice(0, 10);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error("Date must be in yyyy-mm-dd format");
  }

  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) {
    throw new Error("Invalid date");
  }

  return date;
};
