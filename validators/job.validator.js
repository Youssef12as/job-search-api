import Joi from 'joi';

export const createJobSchema = Joi.object({
  jobTitle: Joi.string().trim().required(),
  jobType: Joi.string().valid('internship', 'fullTime', 'partTime').required(),
  jobWorkPlaceType: Joi.string().valid('onsite', 'remote', 'hybrid').required(),
  jobDescription: Joi.string().trim().required(),
  jobLocation: Joi.string().trim(),
  jobIndustry: Joi.string().trim(),

  // Logical Date Validation
  jobStartDate: Joi.date().iso(),
  jobEndDate: Joi.date().iso().min(Joi.ref('jobStartDate')),
  jobApplicationDeadline: Joi.date().iso().greater('now').required(),

  jobResponsibilities: Joi.array().items(Joi.string()),
  jobRequirements: Joi.array().items(Joi.string()),
  jobSkills: Joi.array().items(Joi.string()),
  jobTargetUniversities: Joi.array().items(Joi.string()),
  jobTargetMajors: Joi.array().items(Joi.string()),
});

//reuse the createJobSchema using .fork() makes all inherited fields optional for partial updates

export const updateJobSchema = createJobSchema.fork(
  Object.keys(createJobSchema.describe().keys),
  (schema) => schema.optional()
).append({
  jobStatus: Joi.string().valid('available', 'completed')
}).min(1);
