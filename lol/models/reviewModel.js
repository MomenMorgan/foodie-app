const mongoose = require('mongoose');

const Recipe = require('./recipeModel');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  title: {
    type: String
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  recipe: {
    type: Schema.ObjectId,
    ref: 'Recipe',
    required: true
  }
});

reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: 'user recipe', select: 'name' });
  next();
});

reviewSchema.statics.calcAvgRatings = async function (recipeId) {
  const result = await this.aggregate([
    {
      $match: { recipe: recipeId }
    },
    {
      $group: {
        _id: 'recipe',
        ratingsAverage: { $avg: '$rating' },
        ratingsQuantity: { $sum: 1 }
      }
    }
  ]);

  if (result.length > 0) {
    await Recipe.findByIdAndUpdate(recipeId, {
      ratingsAverage: result[0].ratingsAverage,
      ratingsQuantity: result[0].ratingsQuantity
    });
  } else {
    await Recipe.findByIdAndUpdate(recipeId, {
      ratingsAverage: 0,
      ratingsQuantity: 0
    });
  }
}

reviewSchema.post('save', async function () {
  if (typeof this.recipe === 'object') {
    this.recipe = this.recipe._id;
  }
  await this.constructor.calcAvgRatings(this.recipe);
});

reviewSchema.post('findOneAndDelete', async function (doc) {
  if (typeof doc.recipe === 'object') {
    doc.recipe = doc.recipe._id;
  }
  await doc.constructor.calcAvgRatings(doc.recipe);
});

module.exports = mongoose.model('Review', reviewSchema);
