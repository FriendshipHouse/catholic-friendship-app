import mongoose from 'mongoose';

const registrationsSchema = new mongoose.Schema({
  categoryId: {
    type: String,
    required: [true, 'CategoryId is required'],
  },
  eventId: {
    type: String,
    required: [true, 'EventId is required'],
  },
  activityId: {
    type: String,
    required: [true, 'ActivityId is required'],
  },
  fullName: {
    type: String,
    required: [true, 'Full Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  birthday: {
    type: String,
  },
  id: {
    type: String,
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
  },
  lineId: {
    type: String,
  },
  parish: {
    type: String,
  },
  sharePicture: {
    type: Boolean,
    required: [true, 'Agree Share Picture is required'],
  },
  knowInfo: {
    type: [String],
    required: [true, 'Information source is required'],
    validate: {
      validator: (array?: string[]) => (array ?? []).length > 0,
      message: 'Information source must contain at least one item',
    },
  },
  submissionTime: {
    type: String,
    required: [true, 'Submission Time is required'],
  },
  otherKnowInfo: {
    type: String,
  },
});

registrationsSchema.index({ activityId: 1, email: 1 }, { unique: true });

const Registrations =
  mongoose.models.registrations || mongoose.model('registrations', registrationsSchema);

export default Registrations;
