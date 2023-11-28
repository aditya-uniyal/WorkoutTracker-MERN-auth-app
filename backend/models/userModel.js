const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static method to signup user
UserSchema.statics.signup = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled.");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  // this refers to the user model
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  // generate salt (random string added to the password)
  const salt = await bcrypt.genSalt(10);

  // hash password with added salt
  const hash = await bcrypt.hash(password, salt);

  // save user
  const user = await this.create({ email, password: hash });

  return user;
};

// static method to login user
UserSchema.statics.login = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled.");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Invalid Credentials - email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Invalid Credentials - password");
  }

  return user;
};

module.exports = mongoose.model("User", UserSchema);
