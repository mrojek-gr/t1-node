import usersService from "../services/usersService.js";

class UsersController {
  async getAll(req, res) {
    try {
      const users = await usersService.getUsers();
      if (!users) {
        return res.status(404).json({ error: "Users not found" });
      }
      res.json(users);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const user = await usersService.getUser(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  async create(req, res) {
    try {
      const { username } = req.body;
      const user = await usersService.createUser(username);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

export default new UsersController();
