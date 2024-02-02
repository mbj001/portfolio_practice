// MYSQL 
// ## main 정보
// use testdb;
// create table mbj_portfolio01_main (name varchar(30) not null, main_content varchar(150) not null, sub_content varchar(150));
// insert into mbj_portfolio01_main(name, main_content, sub_content) values ("BJ MIN", "안녕하세요? 개발자 민병준입니다.!!", "Thank you for visiting my portfolio");
// select * from mbj_portfolio01_main;

// ## about 정보
// use testdb;
// create table mbj_portfolio01_about (name varchar(30) not null, birth date not null, address varchar(50) not null, email varchar(50) not null, school varchar(30), department varchar(50), orgphoto varchar(50), photo varchar(50));
// insert into mbj_portfolio01_about (name, birth, address, email, school, department) values ("민병준", "1996-09-11", "경기도 김포시 장기동", "mbj001@naver.com", "가톨릭대학교", "정보통신 전자공학부");
// select * from mbj_portfolio01_about;
// drop table mbj_portfolio01_about;

// ## skills 정보
// create table mbj_portfolio01_skills (num integer auto_increment primary key, name varchar(30) not null, percent integer not null);
// insert into mbj_portfolio01_skills (name, percent) values ("Javascript", 80), ("React", 70), ("JQeury", 50), ("NodeJS", 70), ("CSS3", 70);
// select * from mbj_portfolio01_skills;
// drop table mbj_portfolio01_skills;

// ## timeline
// create table mbj_portfolio01_timeline (num integer auto_increment primary key, name varchar(45) not null, area varchar(30) not null, year integer not null);
// insert into mbj_portfolio01_timeline (name, area, year) values ("프로그래머 워크 참가", "필라델피아", 2023), ("구글 자문위원 위촉", "미국", 2022), ("네이버 웹사이트 DB 제작", "서울", 2021), ("카카오톡 개발", "서울", 2020); 
// select * from mbj_portfolio01_timeline;
// drop table mbj_portfolio01_timeline;

// create table mbj_portfolio01_projects (num integer auto_increment primary key, name varchar(40) not null, orgimg1 varchar(50), img1 varchar(50), orgimg2 varchar(50), img2 varchar(50));
// select * from mbj_portfolio01_projects;
// drop table mbj_portfolio01_projects;

// create table mbj_portfolio01_contact (email varchar(30) not null, phone varchar(30), orgimg varchar(50), img varchar(50), service_id varchar(40), template_id varchar(50), api varchar(50));
// select * from mbj_portfolio01_contact;

// create table mbj_portfolio01_login (userid varchar(30) not null, userpass varchar(100) not null);
// insert into mbj_portfolio01_login (userid, userpass) values ("root", "1234");

const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const mysqlConnect = {
    init: function(){
        return mysql.createConnection({
            host: process.env.MYSQL_HOST,
            database: process.env.MYSQL_DB,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASS,
            port: process.env.MYSQL_PORT,
            charset: process.env.MYSQL_CHARSET
        })
    },
    
    open: function(conn){
        conn.connect(function(err){
            if(err) {
                console.error('MYSQL connection failed');
                console.error('Error Code :' + err.code);
                console.error('Error Message : ' + err.message);
            }else{
                console.log("MYSQL Connect Complete!!!")
            }
        });
    }
}


// mysql 연결
// const mysqlConn = require("../config/mysql");
// const conn = mysqlConn.init();
// mysqlConn.open(conn); 
const conn = mysqlConnect.init();
mysqlConnect.open(conn);

module.exports = conn;