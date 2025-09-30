import usersRepository from "../repositories/usersRepository.js";
import { validateDate } from "../utils/dateValidator.js";

class UsersService {
  async getUsers() {
    return usersRepository.getUsers();
  }
  async getUser(id) {
    if (!id) {
      throw new Error("Id is required");
    }
    return await usersRepository.getUser(id);
  }
  async createUser(username) {
    if (!username || typeof username !== "string" || !username.trim()) {
      throw new Error("Username is required");
    }
    const existing = await usersRepository.findByUsername(username.trim());
    if (existing) {
      throw new Error("Username already taken");
    }

    return usersRepository.create(username.trim());
  }
  async createExercise(id, exercise) {
    if (!id) {
      throw new Error("Id is required");
    }

    if (!exercise.description || typeof exercise.description !== "string") {
      throw new Error("Description is required and must be a string");
    }

    const durationNum = Number(exercise.duration);
    if (!durationNum || isNaN(durationNum)) {
      throw new Error("Duration is required and must be a number");
    }

    exercise.date = validateDate(exercise.date);

    const user = await usersRepository.getUser(id);
    if (!user) {
      throw new Error("User not found");
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
    if (!id) {
      throw new Error("Id is required");
    }

    const user = await usersRepository.getUser(id);
    if (!user) {
      throw new Error("User not found");
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
