const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Define Schema
const Schema = mongoose.Schema;

const SupplierSchema = new Schema({
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true
    },
    address: {
      type: String,
      trim: false,
      required: true
    }
});

// hash user password before saving into database
SupplierSchema.pre('save', async function (next) {
  let user = this
  const password = user.password

  const hashedPassword = await hashPassword(user);
  user.password = hashedPassword

  next()
});

async function hashPassword (user) {
  const password = user.password
  const saltRounds = 10

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function(err, hash) {
      if (err) reject(err)
      resolve(hash)
    });
  })
  return hashedPassword
};

module.exports = mongoose.model('Supplier', SupplierSchema)