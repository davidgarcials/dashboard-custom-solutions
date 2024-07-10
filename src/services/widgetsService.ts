import { Widget } from "../models/widgets";
import SolutionsRepository from "../repositories/solutionsRepository";

class WidgetsService {
  private readonly solutionRepository: SolutionsRepository;

  constructor(solutionRepository: SolutionsRepository) {
    this.solutionRepository = solutionRepository;
  }

  async create(
    solutionId: string,
    screenId: string,
    widgetData: Omit<Widget, "id">,
  ): Promise<string> {
    return this.solutionRepository.createWidget(
      solutionId,
      screenId,
      widgetData,
    );
  }

  async modify(
    solutionId: string,
    screenId: string,
    widgetData: Widget,
  ): Promise<{ success: boolean; error?: string }> {
    const result = await this.solutionRepository.updateWidget(
      solutionId,
      screenId,
      widgetData,
    );

    if (!result.modifiedCount) {
      return { success: false, error: "Error modifying widget" };
    }

    return { success: true };
  }

  async delete(
    solutionId: string,
    screenId: string,
    widgetId: string,
  ): Promise<{ success: boolean; error?: string }> {
    const result = await this.solutionRepository.deleteWidget(
      solutionId,
      screenId,
      widgetId,
    );
    if (!result.modifiedCount) {
      return { success: false, error: "Widget could not be deleted" };
    }

    return { success: true };
  }
}

export default WidgetsService;
