const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  ingredients: [{
    type: String,
    required: true
  }],
  prep_time: Number,
  calories: Number,
  vegetarian: {
    type: Boolean,
    required: true
  },
  diet: String,
  ratingsAverage: {
    type: Number,
    min: 1,
    max: 5
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  category: {
    _id: {
      type: Schema.ObjectId,
      ref: 'Category',
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  subcategory: {
    _id: {
      type: Schema.ObjectId,
      ref: 'SubCategory',
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

recipeSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'recipe'
});

recipeSchema.pre('findOneAndDelete', async function () {
  const Review = require('./reviewModel');
  const recipe = await Recipe.findById(this.getQuery()._id).populate('reviews');
  if (recipe.reviews && recipe.reviews.length > 0) {
    const reviewIds = recipe.reviews.map(review => review._id);
    await Review.deleteMany({ _id: { $in: reviewIds } });
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
