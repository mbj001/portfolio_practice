
// const saltRound = 1515;
// // 암호문 생성
// bcrypt.hash(암호문, saltRound, (err, hash) => {
//     try{
//         // 암호화된 코드 
//     }
//     catch{

//     }
// });

// // 암호문 확인
// bcrypt.compare(이전 암호문, 새로받은 암호문, (err, res) => {
//     try{
//         if(res){
//             // 로그인
//         }
//         else{
//             // 로그인 실패
//         }
//     }
// })

const express = require("express");
const conn = require("../config/mysql");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

dotenv.config();

const router = express.Router();
router.use(cors());
router.use(cookieParser());

router.get("/", (req, res) => {
    console.log("***** routes => login.js => router.get('/')");
    res.render("login", {title: "로그인"});
})


router.post("/signin", async (req, res) => {
    console.log("***** routes => login.js => router.post('/signin')");
    // console.log("salt: " + process.env.SALT_ROUNDS);
    const login_select_query = `select * from mbj_portfolio01_login`;
    conn.query(login_select_query, async (err, login_select_result, fields) => {
        if(login_select_result[0].userid == req.body.userid){
            const hash = await bcrypt.hash(req.body.userpass, Number(process.env.SALT_ROUNDS));
            if(hash){
                const match = await bcrypt.compare("1234", hash);
                if(match){
                    res.redirect("/");
                }            
                else{
                    console.log("진입");
                    res.send("<script>alert('아이디, 비밀번호를 잘못 입력하셨습니다. 다시 입력해주세요.'); location.href='/login';</script>");
                }
            }
        }
        else{
            res.send("<script>alert('아이디, 비밀번호를 잘못 입력하셨습니다. 다시 입력해주세요.'); location.href='/login';</script>");
        }
    })
})

module.exports = router;