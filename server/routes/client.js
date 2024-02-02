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

router.get("/timeline", (req, res) => {
    console.log("***** routes => client.js => router.get('/timeline')");
    
    const client_timeline_query = `select * from mbj_portfolio01_timeline`;
    conn.query(client_timeline_query, (err, client_timeline_result, fields) => {
        if(err){
            console.error(err)
        }
        else{
            res.send(client_timeline_result);
        }
    })
})

router.get("/skills", (req, res) => {
    console.log("***** routes => client.js => router.get('/skills')");
    
    const client_skills_query = `select * from mbj_portfolio01_skills`;
    conn.query(client_skills_query, (err, client_skills_result, fields) => {
        if(err){
            console.error(err)
        }
        else{
            res.send(client_skills_result);
        }
    })
})

router.get("/projects", (req, res) => {
    console.log("***** routes => client.js => router.get('/projects')");
    
    const client_select_query = `select * from mbj_portfolio01_projects`;
    conn.query(client_select_query, (err, client_select_result, fields) => {
        res.send(client_select_result);
    })
})

router.get("/about", (req, res) => {
    console.log("***** routes => client.js => router.get('/about')");
    const about_client_query = `select *, date_format(birth, '%Y/%m/%d') as birthday from mbj_portfolio01_about`;

    conn.query(about_client_query, (err, about_client_result, fields) => {
        if(err){
            console.error(err);
        }
        else{
            res.send(about_client_result);
        }
    })

})

router.get("/contact", (req, res) => {
    console.log("***** routes => client.js => router.get('/contact')");

    const contact_client_query = `select * from mbj_portfolio01_contact`;
    conn.query(contact_client_query, (err, contact_client_result, fields) => {
        if(err){
            console.error(err);
        }
        else{
            res.send(contact_client_result);
        }
    })
})


router.get("/main", async(req, res) => {
    console.log("***** routes => client.js => router.get('/main')");
    const main_client_query = "select * from mbj_portfolio01_main";
    let [main_client_result, fields] =  await conn.promise().query(main_client_query);
    res.send(main_client_result);
})

module.exports = router;