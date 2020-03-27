const router = require("express").Router();
const bcrypt = require("bcryptjs");
const db = require("./users-model");

router.post("/register", (req, res) => {
  // implement registration
  const userInfo = req.body;
  const ROUNDS = process.env.HASHING_ROUNDS || 8;
  const hash = bcrypt.hashSync(userInfo.password, ROUNDS);

  userInfo.password = hash;
  db.add(userInfo)
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err.message));
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.status(200).json({ message: "welcome to dumb jokes.com, oof" });
      } else {
        res.status(401).json({ message: "invalid credentials" });
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "error finding the user" });
    });
});

module.exports = router;
