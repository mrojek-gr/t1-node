import usersRepository from "../repositories/usersRepository.js";
import { AppError } from "../utils/appError.js";
import { validateDate } from "../utils/dateValidator.js";

class UsersService {
  async getUsers() {
    return usersRepository.getUsers();
  }
  async getUser(id) {
    const user = await usersRepository.getUser(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }
  async createUser(username) {
    if (!username || typeof username !== "string" || !username.trim()) {
      throw new AppError("Username is required", 400);
    }
    const existing = await usersRepository.findByUsername(username.trim());
    if (existing) {
      throw new AppError("Username already taken", 400);
    }

    return usersRepository.create(username.trim());
  }
  async createExercise(id, exercise) {
    if (!exercise.description || typeof exercise.description !== "string") {
      throw new AppError("Description is required and must be a string", 400);
    }

    const durationNum = Number(exercise.duration);
    if (!durationNum || isNaN(durationNum) || durationNum < 0) {
      throw new AppError(
        "Duration is required and must be a positive number",
        400
      );
    }

    exercise.date = validateDate(exercise.date);

    const user = await usersRepository.getUser(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const newExercise = await usersRepository.createExercise(id, exercise);

    return {
      _id: user._id,
      username: user.username,
      description: newExercise.description,
      duration: newExercise.duration,
      date: new Date(newExercise.date).toDateString(),
    };
  }
  async getUserLogs(id, filters) {
    const user = await usersRepository.getUser(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const exercises = await usersRepository.getExercises(id, filters);
    const totalCount = await usersRepository.countExercises(id, filters);

    return {
      _id: user._id,
      username: user.username,
      count: totalCount,
      log: exercises,
    };
  }
}

export default new UsersService();
