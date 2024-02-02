const express = require("express");
const fs = require("fs-extra");
const upload = require("../upload/upload");
const conn = require("../config/mysql");
const cors = require("cors");

const router = express.Router();
router.use(cors());

router.get("/", (req, res) => {
    console.log("***** routes => projects.js => router.get('/')");
    const project_select_query = "select * from mbj_portfolio01_projects"
    conn.query(project_select_query, (err, project_select_result, fields) => {
        res.render("projectsinfo", {title: "프로젝트 정보", result: project_select_result});
    })
})

router.get("/write", (req, res) => {
    console.log("***** routes => projects.js => router.get('/write')");
    res.render("project_write", {title: "새 프로젝트 등록"});
})

router.post("/write_form", upload.array("img"), (req, res) => {
    console.log("***** routes => projects.js => router.get('/write')");

    if(req.files.length < 2){
        res.send("<script>alert('두 장의 사진을 등록해 주세요.'); location.href='/projects/write';</script>");
    }
    else{
        for(let i=0; i<req.files.length; i++){
            fs.moveSync("./img/" + req.files[i].filename, "./img/projects/" + req.files[i].filename);
        }

        const project_write_query = `insert into mbj_portfolio01_projects (name, orgimg1, img1, orgimg2, img2) values (?, ?, ?, ?, ?)`;
        conn.query(project_write_query, [req.body.name, req.files[0].originalname, req.files[0].filename, req.files[1].originalname, req.files[1].filename], 
            (err, project_write_result, fields) => {
                if(err){
                    console.error(err);
                }
                else{
                    res.redirect("/projects");
                }
            })
    }
})

router.get("/edit/:num", (req, res) => {
    console.log("***** routes => projects.js => router.get('/edit/:" + req.params.num + "')");
    
    const project_edit_query = `select * from mbj_portfolio01_projects where ?`;
    conn.query(project_edit_query, [{num: req.params.num}], (err, project_edit_result, fields) => {
        if(err){
            console.error(err);
        }
        else{
            res.render("project_edit", {title: "프로젝트 수정", result: project_edit_result[0]});
        }
    })
})

router.post("/edit_form", upload.array("img"), (req, res) => {
    console.log("***** routes => projects.js => router.post('/edit_form')");
    const project_edit_query = `update mbj_portfolio01_projects set ? where ?`
    if(!req.body.check){
        conn.query(project_edit_query, [{name: req.body.name}, {num: req.body.num}], (err, project_edit_result, fields) => {
            if(err){
                console.error(err);
            }
        })
    }
    else{
        if(req.body.check.length != req.files.length){
            res.send("<script>alert('수정하려는 이미지를 등록해주세요.'); location.href='/projects/edit/" + req.body.num + "' </script>")
        }
        else{
     
            for(let i=0; i<req.files.length; i++){
                fs.moveSync("./img/" + req.files[i].filename, "./img/projects/" + req.files[i].filename);
            }
            if(req.body.check == 1){
                conn.query(project_edit_query, [{name: req.body.name, orgimg1: req.files[0].originalname, img1: req.files[0].filename}, {num: req.body.num}], (err, project_edit_result) => {
                    if(err){
                        console.error(err)
                    }
                })
            }
            else if(req.body.check == 2){
                conn.query(project_edit_query, [{name: req.body.name, orgimg2: req.files[0].originalname, img2: req.files[0].filename}, {num: req.body.num}], (err, project_edit_result) => {
                    if(err){
                        console.error(err)
                    }
                })
            }
            // req.body.check == 1, 2
            else{
                conn.query(project_edit_query, [{name: req.body.name, orgimg1: req.files[0].originalname, img1: req.files[0].filename, orgimg2: req.files[1].originalname, img2: req.files[1].filename}, {num: req.body.num}], (err, project_edit_result) => {
                    if(err){
                        console.error(err)
                    }
                })
            }
            
        }
    }
    res.redirect("/projects");
})

module.exports = router;