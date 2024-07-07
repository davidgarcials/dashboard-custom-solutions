import SolutionsRepository from '../repositories/solutionsRepository'

class SolutionsService {
  private readonly solutionRepository: SolutionsRepository

  constructor (solutionRepository: SolutionsRepository) {
    this.solutionRepository = solutionRepository
  }

  async create (owner: string): Promise<boolean> {
    await this.solutionRepository.createSolution(owner)
    return true
  }
}

export default SolutionsService
