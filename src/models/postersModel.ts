import mongoose from 'mongoose';

const posterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    unique: true,
  },
  link: {
    type: String,
    required: [true, 'Link is required'],
  },
});

const Poster = mongoose.models.posters || mongoose.model('posters', posterSchema);

export default Poster;
