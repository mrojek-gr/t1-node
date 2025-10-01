import usersService from "../services/usersService.js";
import { AppError } from "../utils/appError.js";

class UsersController {
  async getAll(req, res, next) {
    try {
      const users = await usersService.getUsers();
      res.status(200).json(users || []);
    } catch (err) {
      next(err);
    }
  }
  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const user = await usersService.getUser(id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
  async create(req, res, next) {
    try {
      const { username } = req.body;
      const user = await usersService.createUser(username);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }
  async createExercise(req, res, next) {
    try {
      const { id } = req.params;
      const { description, duration, date } = req.body;
      const exercise = {
        description,
        duration,
        date,
      };
      const user = await usersService.createExercise(id, exercise);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }
  async getLogs(req, res, next) {
    try {
      const { id } = req.params;
      const { from, to, limit } = req.query;

      const result = await usersService.getUserLogs(id, { from, to, limit });
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}

export default new UsersController();
