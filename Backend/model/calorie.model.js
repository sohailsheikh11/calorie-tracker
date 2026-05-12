import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({


  meal_type: String, 
  
  food_name: String,

  calories: Number,

  protein: Number,

  carbs: Number,

  fat: Number,

  createdAt: {
    type: Date,
    default: Date.now
  }

});

const Food = mongoose.model("Food", foodSchema);

export default Food;