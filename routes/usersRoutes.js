import express from "express";
import usersController from "../controllers/usersController.js";

const router = express.Router();

router.get("/", (req, res) => usersController.getAll(req, res));
router.get("/:id", (req, res) => usersController.getOne(req, res));
router.post("/", (req, res) => usersController.create(req, res));

export default router;
