var express = require("express");
var router = express.Router();
let User = require("../models/user");
const bcrypt = require("bcryptjs");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.json("index");
});


module.exports = router;
