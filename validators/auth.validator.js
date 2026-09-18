import Joi from 'joi';

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  companyName: Joi.string().trim().required(),
  companyIndustry: Joi.string().trim(),
  companyLocation: Joi.string().trim(),
  companyWebsite: Joi.string().uri().trim(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
