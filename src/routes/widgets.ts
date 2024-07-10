import express from "express";
import { widgetsService } from "../infrastructure/services";
import validateRequest from "../middleware/validateRequest";
import {
  createWidgetSchema,
  deleteWidgetSchema,
  modifyWidgetSchema,
} from "../middleware/widgetValidator";

const router = express.Router();

router.post(
  "/create",
  validateRequest(createWidgetSchema),
  async (req, res) => {
    try {
      const { solutionId, screenId, widgetData } = req.body;

      const result = await widgetsService.create(
        solutionId,
        screenId,
        widgetData,
      );

      res.status(200).json({ id: result });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },
);

router.post(
  "/modify",
  validateRequest(modifyWidgetSchema),
  async (req, res) => {
    try {
      const { solutionId, screenId, widgetData } = req.body;

      const { error } = await widgetsService.modify(
        solutionId,
        screenId,
        widgetData,
      );

      if (error) {
        return res.status(400).json({ message: error });
      }

      res.send("Widget modified");
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },
);

router.post(
  "/delete",
  validateRequest(deleteWidgetSchema),
  async (req, res) => {
    try {
      const { solutionId, screenId, widgetId } = req.body;

      const { error } = await widgetsService.delete(
        solutionId,
        screenId,
        widgetId,
      );

      if (error) {
        return res.status(400).json({ message: error });
      }

      res.send("Widget deleted");
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },
);

export default router;
