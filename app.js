import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';

import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';
import authRoutes from './routes/auth.routes.js';
import jobRoutes from './routes/job.routes.js';

const app = express();

app.use(helmet());
app.use(mongoSanitize());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

app.use((_req, res) => res.status(404).json({ success: false, msg: 'Route not found' }));
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
