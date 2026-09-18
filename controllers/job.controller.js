import Job from '../models/Job.js';
import Company from '../models/Company.js';

import AppError from '../utils/AppError.js';
import asyncHandler from '../utils/asyncHandler.js';

// DONE: Implement createJob — company posts a new job, costs 1 credit

export const createJob = asyncHandler(async (req, res) => {
  

  const company = await Company.findOneAndUpdate(
    { _id: req.user.id, companyJobCredits: { $gt: 0 } },
    { $inc: { companyJobCredits: -1 } },
    { new: true },
  );

  if (!company) throw new AppError('No job credits remaining', 403);

  const job = await Job.create({ ...req.body, company: req.user.id });

  res.status(201).json({
    success: true,
    data: job,
    remainingCredits: company.companyJobCredits,
  });
});



// DONE: Implement updateJob — company updates one of their own jobs

export const updateJob = asyncHandler(async (req, res) => {
  // in 1 trip

  const job = await Job.findOneAndUpdate(
    { _id: req.params.id, company: req.user.id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new AppError('Job not found or not authorized to update', 404);
  }

  res.status(200).json({ success: true, data: job });
});


// DONE: Implement searchJobs — public search with filters, sorting, and pagination

export const searchJobs = asyncHandler(async (req, res) => {
  const {
    search,
    location,
    industry,
    jobType,
    workplaceType,
    status = 'available',
    sortBy = 'newest',
    page = 1,
    limit = 10,
  } = req.query;

  //filter

  const filter = { jobStatus: status };

  if (location) filter.jobLocation = location;
  if (industry) filter.jobIndustry = industry;
  if (jobType) filter.jobType = jobType;
  if (workplaceType) filter.jobWorkPlaceType = workplaceType;
  if (search) filter.$text = { $search: search };

  //Sort

  const sortOptions = {
    newest: { createdAt: -1 },
    deadline: { jobApplicationDeadline: 1 },
    views: { jobViewCount: -1 },
  };
  let sort = sortOptions[sortBy] || sortOptions.newest;

  //textScore for el weights

  if (search) {
    sort = { score: { $meta: 'textScore' } };
  }

  //Pagination
  const pageNum = Math.max(1, parseInt(page) || 1);
  const limitNum = Math.min(50, Math.max(1, parseInt(limit) || 10));
  const skip = (pageNum - 1) * limitNum;


  const query = Job.find(filter);
  if (search) {
    query.select({ score: { $meta: 'textScore' } });
  }

  const [jobs, totalJobs] = await Promise.all([
    query
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .populate('company', 'companyName email companyIndustry companyLocation')
      .lean(), // read only fast
    Job.countDocuments(filter),
  ]);


  const response = {
    success: true,
    data: jobs,
    pagination: {
      page: pageNum,
      limit: limitNum,
      totalJobs,
      totalPages: Math.ceil(totalJobs / limitNum),
    },
  };

  if (req.user) {
    response.authenticatedAs = req.user.email;
  }

  res.status(200).json(response);
});
