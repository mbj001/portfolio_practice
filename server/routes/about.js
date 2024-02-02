const express = require("express");
const conn = require("../config/mysql");
const cors = require("cors");
const upload = require("../upload/upload");
const fs = require("fs-extra");
// // mysql 연결
// const mysqlConn = require("./config/mysql");
// const conn = mysqlConn.init();
// mysqlConn.open(conn); 

const router = express.Router();
router.use(cors());


router.get("/", (req, res) => {
    console.log("***** routes => about.js => router.get('/')");
    const about_info_query = "select *, date_format(birth, '%Y/%m/%d') as birthday from mbj_portfolio01_about";
    conn.query(about_info_query, (err, about_info_result) => {
        if(err){
            console.error(err)
        }
        else{
            res.render("aboutinfo",{title: "About 정보", about_info: about_info_result[0]});
        }
    })
})


router.get("/edit", (req, res) => {
    console.log("***** routes => about.js => router.get('/edit')");
    const about_edit_query = `select *, date_format(birth, '%Y/%m/%d') as birthday from mbj_portfolio01_about`;
    // const sql = "select *, date_format(wdate, '%Y/%m/%d. %r') as wwdate from ndboard order by orNum desc, grNum asc";
    conn.query(about_edit_query, (err, about_edit_result, fields) => {
        if(err){
            console.error(err);
        }
        else{
            res.render("about_edit", {title: "About 수정 페이지", result: about_edit_result[0]});
        }
    })
})

router.post("/edit_form", upload.single("photo"), (req, res) => {
    console.log("***** routes => about.js => router.post('/edit_form')");
    if(req.body.imgcheck == 1){
        if(req.file){
            fs.moveSync("./img/" + req.file.filename, "./img/about/" + req.file.filename);
            const edit_query = `update mbj_portfolio01_about set ?`
            conn.query(edit_query, [{
                name: req.body.name, birth: req.body.birth, address: req.body.address, email: req.body.email, school: req.body.school, department: req.body.department, orgphoto: req.file.originalname, photo: req.file.filename
            }],(err, edit_result, fields) => {
                res.redirect("/about");
            })
        }
        else{
            res.send("<script>alert('사진을 등록해주세요.'); location.href='/about/edit'; </script>");
        }
    }
    else{
        const edit_query = `update mbj_portfolio01_about set ?`
        conn.query(edit_query, [{name: req.body.name, birth: req.body.birth, address: req.body.address, email: req.body.email, school: req.body.school, department: req.body.department}]
            , (err, edit_result, fields) => {
                res.redirect("/about");
        })
    }
})

module.exports = router;