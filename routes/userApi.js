
const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/userSchema");

router.get("/users", async (req, res, next) => {
  const users = await User.find();
  res.send(users);
});

router.get("/users/:id", async (req, res, next) => {
  const users = await User.findById(req.params.id);
  res.send(users);
});

router.post("/users", async (req, res, next) => {
  User.create(req.body)
    .then(function (user) {
      res.send(user);
    })
    .catch(next);
});

router.put("/users/:id", (req, res, next) => {
  User.findByIdAndUpdate({ _id: req.params.id }, req.body).then((user) => {
    res.send(user);
  });
});

router.delete("/users/:id", (req, res, next) => {
  User.findByIdAndRemove({ _id: req.params.id }).then((user) => {
    res.send(user);
  });
});

router.post("/affect/:iduser/:idtodo", async (req, res, next) => {
  User.findByIdAndUpdate(
    { _id: req.params.iduser },
    { $push: { todosId: req.params.idtodo } }
  ).then((user) => {
    console.log(user);
    res.send(user);
  });
});


router.post("/register", async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });
  const unique = await User.findOne({ email: req.body.email });
  if (unique) return res.status(400).send({ message: "email already in use" });

  let salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(user);
});
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });console.log(user);
  if (!user) return res.send("wrong email or password");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.send("wrong email or password");
    {
      let token = jwt.sign(
        {
          data: {
            _id: user._id,
            username: user.firstName,
            email: user.email
            
          }, 
        },
        "secret"
      );
      
      res.send({ token: token });
    } 
    

});
module.exports = router;
