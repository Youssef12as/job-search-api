import mongoose, { Schema } from 'mongoose';

const JOB_TYPES = ['internship', 'fullTime', 'partTime'];
const WORKPLACE_TYPES = ['onsite', 'remote', 'hybrid'];
const JOB_STATUS = ['available', 'completed'];

const jobSchema = new Schema(
  {
    company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    jobTitle: { type: String, required: true, trim: true },
    jobType: { type: String, enum: JOB_TYPES, required: true },
    jobWorkPlaceType: { type: String, enum: WORKPLACE_TYPES, required: true },
    jobStatus: { type: String, enum: JOB_STATUS, default: 'available' },
    jobDescription: { type: String, required: true, trim: true },
    jobLocation: { type: String, trim: true },
    jobIndustry: { type: String, trim: true },
    jobStartDate: { type: Date },
    jobEndDate: { type: Date, default: null },
    jobApplicationDeadline: { type: Date, required: true },
    jobResponsibilities: { type: [String], default: [] },
    jobRequirements: { type: [String], default: [] },
    jobSkills: { type: [String], default: [] },
    jobTargetUniversities: { type: [String], default: [] },
    jobTargetMajors: { type: [String], default: [] },
    jobViewCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// ─────────────────────────────────────────────────────────────────────────────
// DONE: Add indexes here.



jobSchema.index({ jobStatus: 1, jobLocation: 1, jobIndustry: 1, createdAt: -1 });


//searh by weights basd on pir
jobSchema.index(
  { jobTitle: 'text', jobSkills: 'text', jobDescription: 'text' },
  {
    weights: { jobTitle: 7, jobSkills: 5, jobDescription: 2 },
    name: 'JobTextIndex'
  }
);


// fast lookup to jobs by company 

jobSchema.index({ company: 1 });  


// ─────────────────────────────────────────────────────────────────────────────

export default mongoose.model('Job', jobSchema);
