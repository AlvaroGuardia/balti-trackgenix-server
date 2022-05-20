import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    projectName: { type: String, required: true },
    description: { type: String, required: false },
    isActive: { type: Boolean, required: true },
    admin: { type: Schema.Types.ObjectId, required: true, ref: 'Admins' },
    client: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: false },
    employees:
      [
        {
          employeeId: { type: Schema.Types.ObjectId, required: true, ref: 'Employee' },
          role: { type: String, required: true, enum: ['DEV', 'QA', 'PM', 'TL'] },
          rate: { type: Number, required: true },
          hoursInProject: { type: Number, required: true },
        },
      ],
  },
);

export default mongoose.model('Project', projectSchema);
