const router = require("express").Router();
const jwt = require("jsonwebtoken");
let { User, validate, validateLogin } = require("../models/user.model");
const Admin = require("../models/admin.model");
const Reporter = require("../models/reporter.model");
const Police = require("../models/police.model");
let bcrypt = require("bcrypt");
let rateLimitAndAuthMiddleware = require("../middleware/rateLimitAndAuthMiddleware");
const { v4: uuidv4 } = require("uuid");

const generateAnonymousAuthtoken = (chatId) => {
  const token = jwt.sign({ _id: chatId }, process.env.PRIVATE_KEY, {
    expiresIn: "1d",
  });
  return token;
};
router.route("/auth/register").post(async (req, res) => {
  try {
    console.log(req.body);
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already exists" });
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const chatId = uuidv4();
    const newuser = await new User({
      ...req.body,
      chatId,
      password: hashPassword,
    }).save();
    if (newuser.accounttype === "reporter") {
      await new Reporter({
        user: newuser._id.toString(),
      }).save();
    }
    if (newuser.accounttype === "admin") {
      await new Admin({
        user: newuser._id.toString(),
      }).save();
    }
    if (newuser.accounttype === "police") {
      await new Police({
        user: newuser._id.toString(),
      }).save();
    }

    return res.status(200).send({ message: "User Created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

router.route("/auth/anonymous").get(async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash("anonymous user202", salt);
    const chatId = uuidv4();
    const token = generateAnonymousAuthtoken(chatId);
    const newuser = await new User({
      firstname: "Anonymous",
      lastname: "user",
      email: "anonymous@anonymous.com",
      password: "anonymous user202",
      accounttype: "reporter",
      chatId,
      password: hashPassword,
    }).save();

    res.status(200).send({
      data: token,
      message: "Logged in successfully",
      firstname: newuser.firstname,
      lastname: newuser.lastname,
      phonenumber: "",
      email: newuser.email,
      accounttype: newuser.accounttype,

      chatId: chatId,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.route("/auth/login").post(async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "Invalid Email or Password" });
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).send({ message: "Invalid Email or Password" });
    }
    const token = user.generaterateLimitAndAuthMiddleware();

    res.status(200).send({
      data: token,
      message: "Logged in successfully",
      firstname: user.firstname,
      lastname: user.lastname,
      phonenumber: user.phonenumber,
      email: user.email,
      accounttype: user.accounttype,
      verified: user.verified,
      isAdmin: user.isAdmin,
      chatId: user.chatId,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
