const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here. Goog to do!");
});

module.exports = router;
