import mongoose from 'mongoose';

const { Schema } = mongoose;

const employeeSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  assignedProjects: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Project',
    },
  ],
  isActive: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model('Employee', employeeSchema);
