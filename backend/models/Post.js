const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['flat_rent', 'furnished_flat_rent', 'flat_buy', 'flat_sell', 'land_buy', 'land_sell', 'need_flat', 'need_land'],
    required: true 
  },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  contact: { type: String, required: true },
  image: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);