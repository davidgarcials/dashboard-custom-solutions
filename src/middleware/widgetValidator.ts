import Joi from "joi";

export const createWidgetSchema = Joi.object({
  solutionId: Joi.string().required(),
  screenId: Joi.string().required(),
  widgetData: Joi.object(),
});

export const modifyWidgetSchema = Joi.object({
  solutionId: Joi.string().required(),
  screenId: Joi.string().required(),
  widgetData: Joi.object(),
});

export const deleteWidgetSchema = Joi.object({
  solutionId: Joi.string().required(),
  screenId: Joi.string().required(),
  widgetId: Joi.string().required(),
});
