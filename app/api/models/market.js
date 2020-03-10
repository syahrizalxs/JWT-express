const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;
const MarketSchema = new Schema({
 marketName: {
  type: String,
  trim: true,  
  required: true,
 },
 marketLocation: {
  type: String,
  trim: true,
  required: true
 },
 marketType: {
     type: String,
     trim: false,
     required: true
 }
});
module.exports = mongoose.model('Market', MarketSchema)