import mongoose from 'mongoose';

const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  image: {
    type: String,
    required: [true, 'Image is required'],
  },
  order: {
    type: Number,
    required: [true, 'Order is required'],
  },
  remark: {
    type: String,
  },
});

const Category = mongoose.models.categories || mongoose.model('categories', categoriesSchema);

export default Category;
