const express = require("express");
const conn = require("../config/mysql");
const cors = require("cors");

const router = express.Router();

router.use(cors());

router.get("/", (req, res) => {
    console.log("***** routes => skills.js => router.get('/')");
    const skills_list_query = `select * from mbj_portfolio01_skills`;
    const update_num_query1 = "set sql_safe updates=0";
    const update_num_query2 = "set @reset_count = 0";
    const update_num_query3 = "update mbj_portfolio01_skills set num=@reset_count:=@reset_count + 1";
    const update_num_query4 = "update mbj_portfolio01_timeline set num=@reset_count:=@reset_count + 1";
    conn.query(skills_list_query, (err, skills_list_result, fields) => {
        if(err){
            console.error(err)
        }
        else{
            const timeline_list_query = `select * from mbj_portfolio01_timeline`;
            conn.query(timeline_list_query, (err, timeline_list_result, fields) => {
                if(err){
                    console.error(err)
                }
                else{
                    conn.query(update_num_query1, (err, rs1, fields) => {
                        conn.query(update_num_query2, (err, rs2, fileds) => {
                            conn.query(update_num_query3, (err, rs3, filed) => {
                                conn.query(update_num_query1, (err, rs4, fileds) => {
                                    conn.query(update_num_query2, (err, rs5, fileds) => {
                                        conn.query(update_num_query4, (err, rs4, fields) => {
                                            res.render("skillinfo", {title: "스킬 페이지", skills_list: skills_list_result, timeline_list: timeline_list_result});
                                        })
                                    })
                                })
                            })
                        })
                    })
                }
            })
        }
    })
})

router.get("/skills_edit/:num", (req, res) => {
    console.log("***** routes => skills.js => router.get('/skills_edit/:" + req.params.num + "')");

    const skill_select_query = `select * from mbj_portfolio01_skills where ?`
    conn.query(skill_select_query, [{num: req.params.num}], (err, skill_select_result) => {
        res.render("skills_edit", {title: "스킬 수정 페이지", skill_info: skill_select_result[0]});
    })
})

router.post("/skill_edit_form", (req, res) => {
    console.log("***** routes => skills.js => router.post('/skill_edit_form')");

    const skill_edit_query = `update mbj_portfolio01_skills set ? where ?`;
    conn.query(skill_edit_query, [{name: req.body.name, percent: req.body.percent}, {num: req.body.num}],(err, skill_edit_result, fileds) => {
        if(err){
            console.error(err);
        }
        else{
            res.redirect("/skills");
        }
    })
})

router.get("/timeline_edit/:num", (req, res) => {
    console.log("***** routes => skills.js => router.get('/timeline_edit/:" + req.params.num + "')");

    const timeline_select_query = `select * from mbj_portfolio01_timeline where ?`;
    conn.query(timeline_select_query, [{num: req.params.num}],(err, timeline_select_result, fields) => {
        if(err){
            console.error(err)
        }
        else{
            res.render("timeline_edit", {title: "타임라인 수정 페이지", timeline_info: timeline_select_result[0]});
        }
    })
})

router.post("/timeline_edit_form", (req, res) => {
    console.log("***** routes => skills.js => router.post('/timeline_edit_form')");

    const timeline_edit_query = `update mbj_portfolio01_timeline set ? where ?`;
    conn.query(timeline_edit_query, [{name: req.body.name, area: req.body.area, year: req.body.year}, {num: req.body.num}],(err, timeline_edit_result, fields) => {
        if(err){
            console.error(err)
        }
        else{
            res.redirect("/skills");
        }
    })
})

router.get("/timeline_write", (req, res) => {
    console.log("***** routes => skills.js => router.get('/timeline_write')");
    res.render("timeline_write", {title: "타임라인 추가 페이지"});
})

router.get("/skills_write", (req, res) => {
    console.log("***** routes => skills.js => router.get('/skills_write')");
    res.render("skills_write", {title: "스킬 추가 페이지"});
})

router.post("/skills_write_form", (req, res) => {
    console.log("***** routes => skills.js => router.post('/skills_write_form')");

    const skills_write_query = `insert into mbj_portfolio01_skills (name, percent) values (?, ?)`
    conn.query(skills_write_query, [req.body.name, req.body.percent], (err, skills_write_result, fields) => {
        if(err){
            console.error(err);
        }
        else{
            res.redirect("/skills");
        }
    })
})

router.post("/timeline_write_form", (req, res) => {
    console.log("***** routes => skills.js => router.post('/timeline_write_form')");

    const timeline_write_query = `insert into mbj_portfolio01_timeline (name, area, year) values (?, ?, ?)`;
    conn.query(timeline_write_query, [req.body.name, req.body.area, req.body.year], (err, timeline_write_result, fields) => {
        if(err){
            console.error(err);
        }
        else{
            res.redirect("/skills");
        }
    })
})

router.get("/skill_del/:num", (req, res) => {
    console.log("***** routes => skills.js => router.get('/skill_del/:" + req.params.num + "')");

    const skill_delete_query = `delete from mbj_portfolio01_skills where ?`;
    conn.query(skill_delete_query, [{num: req.params.num}], (err, skill_delete_result, fields) => {
        if(err){
            console.error(err)
        }
        else{
            res.redirect("/skills");
        }
    })

})

router.get("/timeline_del/:num", (req, res) => {
    console.log("***** routes => skills.js => router.get('/timeline_del/:" + req.params.num + "')");

    const timeline_delete_query = `delete from mbj_portfolio01_timeline where ?`;
    conn.query(timeline_delete_query, [{num: req.params.num}], (err, timeline_delete_result, fields) => {
        if(err){
            console.error(err)
        }
        else{
            res.redirect("/skills");
        }
    })

})

module.exports = router;