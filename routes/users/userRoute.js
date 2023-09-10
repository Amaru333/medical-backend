require("dotenv/config");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/UserModel");

router.get("/credentials/:credential", async (req, res) => {
  const req_jwt = req.params.credential;
  const decoded_credential = jwt.decode(req_jwt);
  const user = await UserModel.findOne({
    email: decoded_credential.email,
  });
  if (user) {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN_KEY);
    res.header("auth-token", token).send(user);
  } else {
    const new_user = new UserModel({
      name: decoded_credential.name,
      email: decoded_credential.email,
      image: decoded_credential.picture,
    });
    const save_user = await new_user.save();
    const token = jwt.sign({ _id: save_user._id }, process.env.JWT_TOKEN_KEY);
    res.header("auth-token", token).send(save_user);
  }
});

module.exports = router;
