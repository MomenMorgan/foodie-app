const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
},
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });


categorySchema.virtual('subcategories', {
  ref: 'SubCategory',
  localField: '_id',
  foreignField: 'category'
})

module.exports = mongoose.model('Category', categorySchema);
