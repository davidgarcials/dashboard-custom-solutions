import SolutionsRepository from "../repositories/solutionsRepository";
import UserRepository from "../repositories/userRepository";
import ScreensService from "../services/screensService";
import SolutionsService from "../services/solutionsService";
import UserService from "../services/userService";
import WidgetsService from "../services/widgetsService";

const solutionRepository = new SolutionsRepository();
const solutionsService = new SolutionsService(solutionRepository);
const screensService = new ScreensService(solutionRepository);
const widgetsService = new WidgetsService(solutionRepository);

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export { solutionsService, screensService, widgetsService, userService };
