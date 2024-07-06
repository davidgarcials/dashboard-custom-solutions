import { ISolutionsRepository } from '../repositories/solutionsRepository'

interface ISolutionsService {
  createByOwner: (owner: string) => boolean
  modifyById: (id: string) => boolean
  deleteById: (id: string) => boolean
}

let repository: ISolutionsRepository

const createByOwner = (owner: string): boolean => {
  repository.createSolution(owner)
  return true
}

const modifyById = (id: string): boolean => {
  repository.modifySolution(id)
  return true
}

const deleteById = (id: string): boolean => {
  repository.deleteSolution(id)
  return true
}

export const SolutionsService = (solutionsRepository: ISolutionsRepository): ISolutionsService => {
  repository = solutionsRepository
  return {
    createByOwner,
    modifyById,
    deleteById
  }
}
