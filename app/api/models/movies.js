const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;
const MovieSchema = new Schema({
 name: {
  type: String,
  trim: true,  
  required: true,
 },
 released_on: {
  type: Date,
  trim: true,
  required: true
 },
 starring: {
     type: String,
     trim: false,
     required: false
 },
 directedBy: {
     type: String,
     trim: false,
     required: false
 }
});
module.exports = mongoose.model('Movie', MovieSchema)