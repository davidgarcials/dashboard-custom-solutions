import SolutionsRepository from "../repositories/solutionsRepository";
import UserRepository from "../repositories/userRepository";
import SolutionsService from "../services/solutionsService";
import UserService from "../services/userService";

const solutionRepository = new SolutionsRepository();
const solutionsService = new SolutionsService(solutionRepository);

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export { solutionsService, userService };
