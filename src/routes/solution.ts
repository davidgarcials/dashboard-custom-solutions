import express from "express";
import { solutionsService } from "../infrastructure/services";
import validateRequest from "../middleware/validateRequest";
import {
  createSolutionSchema,
  deleteSolutionSchema,
  modifySolutionSchema,
} from "../middleware/solutionValidator";

const router = express.Router();

router.get("/:id", async (req, res) => {
  const solution = await solutionsService.findById(req.params.id);

  if (!solution) {
    return res.status(404).json({ error: "Solution not found" });
  }

  res.status(200).json(solution);
});

router.post(
  "/create",
  validateRequest(createSolutionSchema),
  async (req, res) => {
    try {
      const { email, name } = req.body;

      const exists = await solutionsService.findOneByEmailAndName(email, name);

      if (exists) {
        return res.status(400).json({ message: "Solution already exists" });
      }

      const result = await solutionsService.create(email, name);

      res.status(200).json({ id: result });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },
);

router.post(
  "/modify",
  validateRequest(modifySolutionSchema),
  async (req, res) => {
    try {
      const { id, email, name } = req.body;

      const { error } = await solutionsService.modify(id, email, name);

      if (error) {
        return res.status(400).json({ message: error });
      }

      res.send("Solution modified");
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },
);

router.post(
  "/delete",
  validateRequest(deleteSolutionSchema),
  async (req, res) => {
    try {
      const { id } = req.body;

      const { error } = await solutionsService.delete(id);

      if (error) {
        return res.status(400).json({ message: error });
      }

      res.send("Solution deleted");
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },
);

export default router;
