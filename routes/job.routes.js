import { Router } from 'express';
import authenticate from '../middleware/authenticate.js';
import { createJob, updateJob, searchJobs } from '../controllers/job.controller.js';
import checkAuth from '../middleware/checkAuth.js';
import validate from '../middleware/validate.js';
import { createJobSchema, updateJobSchema } from '../validators/job.validator.js';
const router = Router();

// DONE: Define your routes
router.get('/', checkAuth, searchJobs);
router.post('/', authenticate, validate(createJobSchema), createJob);
router.patch('/:id', authenticate, validate(updateJobSchema), updateJob);

export default router;


