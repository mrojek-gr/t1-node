import express from "express";
import usersController from "../controllers/usersController.js";
import { validateUserIdMiddleware } from "../middlewares/validateUserIdMiddleware.js";
import { validateLogsQuery } from "../middlewares/validateLogsQueryMiddleware.js";

const router = express.Router();

router.get("/", usersController.getAll.bind(usersController));
router.get(
  "/:id",
  validateUserIdMiddleware,
  usersController.getOne.bind(usersController)
);
router.post("/", usersController.create.bind(usersController));
router.post(
  "/:id/exercises",
  validateUserIdMiddleware,
  usersController.createExercise.bind(usersController)
);
router.get(
  "/:id/logs",
  validateUserIdMiddleware,
  validateLogsQuery,
  usersController.getLogs.bind(usersController)
);

export default router;
