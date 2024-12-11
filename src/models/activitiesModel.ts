import mongoose from 'mongoose';

const activitiesSchema = new mongoose.Schema({
  categoryId: {
    type: String,
    required: [true, 'CategoryId is required'],
  },
  eventId: {
    type: String,
    required: [true, 'EventId is required'],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  date: {
    type: String,
    required: [true, 'Date is required'],
  },
  time: {
    type: [String],
    required: [true, 'Time is required'],
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  image: {
    type: String,
    required: [true, 'Image is required'],
  },
  registerType: {
    type: String,
    required: [true, 'registerType is required'],
  },
  googleFormLink: {
    type: String,
  },
  systemFormInfo: {
    dueDate: {
      type: String,
    },
    extraFields: {
      type: [String],
    },
    detail: {
      type: String,
    },
    notice: {
      type: String,
    },
  },
});

activitiesSchema.index({ categoryId: 1, eventId: 1, date: 1 }, { unique: true });

const Activity = mongoose.models.activities || mongoose.model('activities', activitiesSchema);

export default Activity;
