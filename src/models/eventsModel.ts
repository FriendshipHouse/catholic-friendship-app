import mongoose from 'mongoose';

const eventsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  description: {
    type: String,
  },
  categoryId: {
    type: String,
    required: [true, 'CategoryId is required'],
  },
  order: {
    type: Number,
    required: [true, 'Order is required'],
  },
});

const Event = mongoose.models.events || mongoose.model('events', eventsSchema);

export default Event;
