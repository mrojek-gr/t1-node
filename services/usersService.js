import usersRepository from "../repositories/usersRepository.js";

class UsersService {
  async getUsers() {
    return usersRepository.getUsers();
  }
  async getUser(id) {
    if (!id) {
      throw new Error("Wrong id");
    }
    return usersRepository.getUser(id);
  }
  async createUser(username) {
    if (!username || typeof username !== "string") {
      throw new Error("Username is required");
    }
    return usersRepository.create(username);
  }
}

export default new UsersService();
