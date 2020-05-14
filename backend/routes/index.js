var express = require("express");
var router = express.Router();
let User = require("../models/user");
const bcrypt = require("bcryptjs");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

router.post("/signup", async function (req, res, next) {
    //console.log(req.body);
    //! front-end send a unity
    const username = req.body.username;
    //hash-password

    let password = req.body.password;
    const hash = bcrypt.hashSync(password, 8);
    password = hash;

    //
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const role = req.body.role;
    const newuser = {
        username,
        password,
        firstname,
        lastname,
        role,
    };

    const result = await User.create(newuser, "user");
    //console.log("Result ", result);
    const ret = {
        id: result.id,
        ...req.body,
    };
    delete ret.password;
    // if (result.status === 400) res.status(result.status).send(result.err);
    // res.status(result.status).send(result.msg);
    console.log(ret);

    res.status(201).json(ret);
});

router.get("/signup", async function (req, res, next) {
    console.log(req.body);
    let result = await User.find(
        `username='${req.body.username}' && password='${req.body.password}'`
    );
    if (result.status === 400) res.status(result.status).send(result.err);
    res.status(result.status).send(result.result);
});

module.exports = router;
