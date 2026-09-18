import Company from '../models/Company.js';
import AppError from '../utils/AppError.js';
import asyncHandler from '../utils/asyncHandler.js';



// DONE: Implement register — create a company account and return a JWT

export const register = asyncHandler(async (req, res) => {
  
    // better than using findone in db if it duplicates db returns code 11000

    const company = await Company.create(req.body).catch((err) => {
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      throw new AppError(`${field} already exists`, 409);
    }
    throw err;
  });

  const token = company.generateToken();

  res.status(201).json({
    success: true,
    data: {
      _id: company._id,
      email: company.email,
      companyName: company.companyName,
      companyIndustry: company.companyIndustry,
      companyLocation: company.companyLocation,
      companyJobCredits: company.companyJobCredits,
    },
    token,
  });
});



// DONE: Implement login — authenticate a company and return a JWT

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;


  const company = await Company.findOne({ email }).select('+password');

  if (!company || !(await company.comparePassword(password)))
    throw new AppError('Invalid email or password', 401);

  const token = company.generateToken();

  res.status(200).json({
    success: true,
    data: {
      _id: company._id,
      email: company.email,
      companyName: company.companyName,
    },
    token,
  });
});
