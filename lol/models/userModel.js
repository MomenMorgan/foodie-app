const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
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
  collections: [{
    name: {
      type: String,
      required: true,
    },
    recipes: [{
      type: Schema.ObjectId,
      ref: 'Recipe'
    }]
  }],
  role: {
    type: String,
    default: 'user'
  }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

userSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'user',
});

module.exports = mongoose.model('User', userSchema);
