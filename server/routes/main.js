const express= require("express");
const conn = require("../config/mysql");
const cors = require("cors");
// // mysql 연결
// const mysql = require("mysql2");
// const mysqlConn = require("../config/mysql");
// const conn = mysqlConn.init();
// mysqlConn.open(conn); 


const router = express.Router();

router.use(cors());


router.get("/", (req, res) => {
    console.log("***** routes => main.js => router.get('/')");
    const main_info_query = `select * from mbj_portfolio01_main`;
    conn.query(main_info_query, (err, main_info_result) => {
        if(err){
            console.error(err);
        }
        else{
            res.render("maininfo",{title: "Main 정보", main_info: main_info_result[0]});
        }
    })
})

router.get("/edit", (req, res) => {
    console.log("***** routes => main.js => router.get('/edit')");
    const main_info_query = `select * from mbj_portfolio01_main`;
    conn.query(main_info_query, (err, main_info_result) => {
        if(err){
            console.error(err);
        }
        else{
            res.render("main_edit", {title: "Main 수정페이지", main_info: main_info_result[0]});
        }
    })
})

router.post("/edit_form", (req, res) => {
    console.log("***** routes => main.js => router.post('/edit_form')");
    const main_edit_query = "update mbj_portfolio01_main set ?";
    conn.query(main_edit_query,[{name: req.body.name, main_content: req.body.main_content, sub_content: req.body.sub_content}], (err, main_edit_result) => {
        if(err){
            console.error(err);
        }
        else{
            res.redirect("/main");
        }
    })
})


module.exports = router;