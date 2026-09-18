import jwt from 'jsonwebtoken';
import Company from '../models/Company.js';


// If everything is valid, it attaches the user to the request.

const checkAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return next(); 
    }

    const token = authHeader.split(' ')[1];
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const company = await Company.findById(decoded.id);
    if (!company) {
      return next();
    }

    req.user = { id: company._id, email: company.email, role: company.role };
    next();
  } catch (err) {
    next();
  }
};

export default checkAuth;
