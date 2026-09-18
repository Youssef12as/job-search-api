import jwt from 'jsonwebtoken';
import Company from '../models/Company.js';
import AppError from '../utils/AppError.js';



// DONE: Implement JWT authentication middleware.
// On success attach { id, email, role } to req.user and call next().


// JWT payload shape: { id, email, role }
// use db better than it 
// this token 7d 
// 1- if company deleted from db thier, token still work and they can post jobs.
// 2- if company updated thier email ,token will still has the old stale data.
// 3- if admin suspended the company ,token still give access untill it expires. 

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer '))
      throw new AppError('Authentication required', 401);

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const company = await Company.findById(decoded.id);
    if (!company) throw new AppError('Company no longer exists', 401);

    req.user = { id: company._id, email: company.email, role: company.role };
    next();
  } catch (err) {
    if (!err.statusCode) err.statusCode = 401;
    next(err);
  }
};

export default authenticate;
