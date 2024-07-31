const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    accounttype: { type: String, required: true },
    phonenumber: { type: String, required: false },
    verified: { type: Boolean, default: false },
    profilepicUrl: { type: String, required: false },
    isAdmin: { type: Boolean, required: false, default: false },
    chatId: { type: String, required: false, default: false },
  },
  {
    timestamps: true,
  }
);

//We'll use cluodinary CDN for storing imageurl
userSchema.methods.generaterateLimitAndAuthMiddleware = function () {
  const token = jwt.sign({ _id: this._id }, process.env.PRIVATE_KEY, {
    expiresIn: "1d",
  });
  return token;
};
const User = mongoose.model("user", userSchema);

const validate = (data) => {
  const schemaregister = Joi.object({
    firstname: Joi.string().required().label("firstname"),
    lastname: Joi.string().required().label("lastname"),
    email: Joi.string().email().required().label("email"),
    phonenumber: Joi.string().required().label("phonenumber"),
    accounttype: Joi.string().required().label("accounttype"),
    password: passwordComplexity().required().label("password"),
  });
  return schemaregister.validate(data);
};
const validateLogin = (data) => {
  const schemalogin = Joi.object({
    email: Joi.string().required().label("email"),
    password: Joi.string().min(8).required().label("password"),
  });
  return schemalogin.validate(data);
};

const isAuthorized = async (req, res, next) => {
  try {
    const { token } = req.data;
    if (!token) {
      return next("Please login to access workspace");
    }
    const verify = await jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findById(verify.id);
    next();
  } catch (error) {
    return next(error);
  }
};
module.exports = { User, validate, validateLogin, isAuthorized };
