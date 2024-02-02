const express = require("express");
const conn = require("../config/mysql");
const upload = require("../upload/upload");
const cors = require("cors");
const fs = require("fs-extra");


const router = express.Router();
router.use(cors());

router.get("/", (req, res) => {
    console.log("***** routes => contact.js => router.get('/')");

    const contact_select_query = `select * from mbj_portfolio01_contact`;
    conn.query(contact_select_query, (err, contact_select_result, fields) => {
        res.render("contactinfo", {title: "이메일 정보", result: contact_select_result[0]});
    })

})

router.get("/edit", (req, res) => {
    console.log("***** routes => contact.js => router.get('/edit')");

    const contact_select_query = `select * from mbj_portfolio01_contact`;
    conn.query(contact_select_query, (err, contact_select_result, fields) => {
        res.render("contact_edit", {title: "이메일 수정", result: contact_select_result[0]});
    })
})

router.post("/edit_form", upload.single("img"), (req, res) => {
    console.log("***** routes => contact.js => router.post('/edit_form')");

    if(req.body.check == 1){
        if(!req.file){
            res.send("<script>alert('이미지를 등록해주세요.'); location.href='/contact/edit'; </script>");
        }
        else{
            fs.moveSync("./img/" + req.file.filename, "./img/contact/" + req.file.filename);
            
            // const contact_update_query = 'insert into mbj_portfolio01_contact (email, phone, orgimg, img, service_id, template_id, api) values (?, ?, ?, ?, ?, ?, ?)';
            const contact_update_query = 'update mbj_portfolio01_contact set ?';
            
            conn.query(contact_update_query, [{email: req.body.email, phone: req.body.phone, orgimg: req.file.originalname, img: req.file.filename, service_id: req.body.service_id, template_id: req.body.template_id, api: req.body.api}], (err, contact_update_result, fields) => {
                res.redirect("/contact");
            })
        }
    }
    else{
        const contact_update_query = 'update mbj_portfolio01_contact set ?';
            
        conn.query(contact_update_query, [{email: req.body.email, phone: req.body.phone, service_id: req.body.service_id, template_id: req.body.template_id, api: req.body.api}], (err, contact_update_result, fields) => {
            res.redirect("/contact");
        })
    }
})


module.exports = router;