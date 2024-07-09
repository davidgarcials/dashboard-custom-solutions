import Joi from "joi";

export const createSolutionSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
});

export const modifySolutionSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
});

export const deleteSolutionSchema = Joi.object({
  id: Joi.string().required(),
});
