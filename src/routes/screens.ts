import express from "express";
import { screensService } from "../infrastructure/services";
import {
  createScreenSchema,
  deleteScreenSchema,
  modifyScreenSchema,
} from "../middleware/screenValidator";
import validateRequest from "../middleware/validateRequest";

const router = express.Router();

router.post(
  "/create",
  validateRequest(createScreenSchema),
  async (req, res) => {
    try {
      const { solutionId, name } = req.body;

      const result = await screensService.create(solutionId, name);

      res.status(200).json({ id: result });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },
);

router.post(
  "/modify",
  validateRequest(modifyScreenSchema),
  async (req, res) => {
    try {
      const { solutionId, screen } = req.body;

      const { error } = await screensService.modify(solutionId, screen);

      if (error) {
        return res.status(400).json({ message: error });
      }

      res.send("Screen modified");
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },
);

router.post(
  "/delete",
  validateRequest(deleteScreenSchema),
  async (req, res) => {
    try {
      const { solutionId, screenId } = req.body;

      const { error } = await screensService.delete(solutionId, screenId);

      if (error) {
        return res.status(400).json({ message: error });
      }

      res.send("Screen deleted");
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },
);

export default router;
