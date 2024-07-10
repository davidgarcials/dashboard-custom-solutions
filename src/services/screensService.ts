import SolutionsRepository from "../repositories/solutionsRepository";
import { Screen } from "../models/screen";

class ScreensService {
  private readonly solutionRepository: SolutionsRepository;

  constructor(solutionRepository: SolutionsRepository) {
    this.solutionRepository = solutionRepository;
  }

  async create(solutionId: string, name: string): Promise<string> {
    return this.solutionRepository.createScreen(solutionId, name);
  }

  async modify(
    solutionId: string,
    screen: Screen,
  ): Promise<{ success: boolean; error?: string }> {
    const result = await this.solutionRepository.updateScreen(
      solutionId,
      screen,
    );

    if (!result.modifiedCount) {
      return { success: false, error: "Error modifying screen" };
    }

    return { success: true };
  }

  async delete(
    solutionId: string,
    screenId: string,
  ): Promise<{ success: boolean; error?: string }> {
    const result = await this.solutionRepository.deleteScreen(
      solutionId,
      screenId,
    );
    if (!result.modifiedCount) {
      return { success: false, error: "Screen could not be deleted" };
    }

    return { success: true };
  }
}

export default ScreensService;
