import { Solution } from "../models/solution";
import SolutionsRepository from "../repositories/solutionsRepository";

class SolutionsService {
  private readonly solutionRepository: SolutionsRepository;

  constructor(solutionRepository: SolutionsRepository) {
    this.solutionRepository = solutionRepository;
  }

  async findById(id: string) {
    return this.solutionRepository.findById(id);
  }

  async findOneByEmailAndName(
    email: string,
    name: string,
  ): Promise<Solution | null> {
    return this.solutionRepository.findOneByEmailAndName(email, name);
  }

  async create(email: string, name: string): Promise<string> {
    return this.solutionRepository.createSolution(email, name);
  }

  async modify(
    id: string,
    email: string,
    name: string,
  ): Promise<{ success: boolean; error?: string }> {
    const result = await this.solutionRepository.modifySolution(
      id,
      email,
      name,
    );

    if (!result.modifiedCount) {
      return { success: false, error: "Error modifying solution" };
    }

    return { success: true };
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
