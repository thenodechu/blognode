const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const Log = require("../models/log").Log;
const SingUp = require("../singupUser");
const SingIn = require("../signinUser");
const router = express.Router();
const Content = require("../models/content").Content;

router.use(bodyParser.json());

router.get("/content/:name", async function (req, res) {
  let result
  if (req.params.name === "none") {
     result = await Content.find();
  } else {
    let auth = await Log.collection.findOne({ logMessage: req.params.name });
    result = await Content.find({nameOfAuthor:auth.name});
  }
  
  await res.json(result);
});

router.get("/article/:id", async function (req, res) {
  let result = await Content.find({ _id: req.params.id });
  await res.json(result);
});



router.post("/post/article/", async function (req, res) {
  await Content.collection.insertOne(req.body.article);
  await res.json("Статья отправлена на проверку");
});

router.post("/post/users/", async function (req, res) {
  let data = {
    name: req.body.user.name,
    email: req.body.user.email,
    password: req.body.user.password,
    storys: [],
  };
  let singup = await new SingUp(data);
  let checkState = await singup.resultSingup();
  if (checkState.check) {
    await res.json({ data: ["Успех"] });
  } else {
    await res.json({ data: checkState.errors });
  }
});


router.post("/checkUser", async function (req, res) {
  let data = {
    jwt: req.body.jwt
  };
  let auth = await Log.collection.findOne({ logMessage: data.jwt });
  if (auth === null) {
    res.json({name:"none"});
  } else {
    res.json({ name: auth.name });
  }
});


router.post("/login", async function (req, res) {
  let data = {
    name: req.body.user.name,
    password: req.body.user.password,
  };
  let singin = await new SingIn(data);
  let checkState = await singin.resultSingin();
  if (checkState.check) {
    await res.json({ data:["Успех"], token:checkState.token,name:checkState.name });
  } else {
    await res.json({ data: checkState.errors });
  }
});

module.exports = router;
