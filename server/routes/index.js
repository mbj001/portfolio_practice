const express = require("express");
const bcrypt = require("bcrypt");
const {isLoggedIn, isNotLoggedIn} = require("../middlewares/index");
const {login, logout} = require("../controller/auth");
const router = express.Router();

router.use((req, res, next) => {
    console.log("***** routers => router.use");
    res.locals.user = req.user;
    next();
})

router.get("/" , (req, res, next) => {
    console.log("***** routes => index.js => router.get('/')");
    res.render("index", {title: "관리자 메인"});
})

// 로그인 안되어 있을 때만 실행되어야 함
router.post("/login", isNotLoggedIn, login);
// 로그인 되어있을 때만 실행되야 함
router.get("/logout", isLoggedIn, logout);


module.exports = router;