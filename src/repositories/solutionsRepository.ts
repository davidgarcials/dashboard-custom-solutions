export interface ISolutionsRepository {
  createSolution: (owner: string) => boolean
  modifySolution: (id: string) => boolean
  deleteSolution: (id: string) => boolean
}

const createSolution = (owner: string): boolean => {
  return true
}

const modifySolution = (id: string): boolean => {
  return true
}

const deleteSolution = (id: string): boolean => {
  return true
}

export const SolutionsRepository = (): ISolutionsRepository => {
  return {
    createSolution,
    modifySolution,
    deleteSolution
  }
}
