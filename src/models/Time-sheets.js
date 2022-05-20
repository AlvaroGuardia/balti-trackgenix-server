import mongoose from 'mongoose';

const { Schema } = mongoose;

const timeSheetSchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Employee',
  },
  project: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Projects',
  },
  role: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  workedHours: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  task: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Tasks',
  },
});

export default mongoose.model('Timesheet', timeSheetSchema);
