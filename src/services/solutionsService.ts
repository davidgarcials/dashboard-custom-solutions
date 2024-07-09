import { Solution } from "../models/solution";
import SolutionsRepository from "../repositories/solutionsRepository";

class SolutionsService {
  private readonly solutionRepository: SolutionsRepository;

  constructor(solutionRepository: SolutionsRepository) {
    this.solutionRepository = solutionRepository;
  }

  async findOne(email: string, name: string): Promise<Solution | null> {
    return this.solutionRepository.findSolution(email, name);
  }

  async create(email: string, name: string): Promise<void> {
    await this.solutionRepository.createSolution(email, name);
  }

  async delete(id: string): Promise<{ success: boolean; error?: string }> {
    const result = await this.solutionRepository.deleteSolution(id);
    if (!result.deletedCount) {
      return { success: false, error: "Solution could not be deleted" };
    }

    return { success: true };
  }
}

export default SolutionsService;
