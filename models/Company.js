import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const companySchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, default: 'company' },
    companyName: { type: String, required: true, trim: true },
    companyIndustry: { type: String, trim: true, default: '' },
    companyLocation: { type: String, trim: true, default: '' },
    companyWebsite: { type: String, trim: true, default: '' },
    companyJobCredits: { type: Number, default: 5 },
  },
  { timestamps: true },
);

companySchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});

companySchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

companySchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, email: this.email, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' },
  );
};

export default mongoose.model('Company', companySchema);
