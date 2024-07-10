import Joi from "joi";

export const createScreenSchema = Joi.object({
  solutionId: Joi.string().required(),
  name: Joi.string().min(3).max(30).required(),
});

export const modifyScreenSchema = Joi.object({
  solutionId: Joi.string().required(),
  screen: Joi.object(),
});

export const deleteScreenSchema = Joi.object({
  solutionId: Joi.string().required(),
  screenId: Joi.string().required(),
});
