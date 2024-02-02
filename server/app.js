// npm install express
// npm install -D nodemon
// npm install nunjucks
// npm install dotenv
// npm install path
// npm install fs
// npm install multer
// npm install fs-extra
// npm install bcrypt
// npm install cookie-parser
// npm install express-session
// npm install passport

const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const nunjucks = require("nunjucks");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");

const indexRouter = require("./routes/index");
const mainRouter = require("./routes/main");
const aboutRouter = require("./routes/about");
const skillsRouter = require("./routes/skills");
const projectsRouter = require("./routes/projects");
const contactRouter = require("./routes/contact");
const clientRouter = require("./routes/client");
// const loginRouter = require("./routes/login");

const {isLoggedIn, isNotLoggedIn} = require("./middlewares/index");
const passportConfig = require("./passport/index")

dotenv.config();
const app = express();

try{
    console.log("img Folder OPEN !!");
    fs.readdirSync("./img");
}
catch{
    console.log("img Folder Create !!");
    fs.mkdirSync("./img");
}


app.set("port", process.env.PORT || 8081);
app.set("view engine", "html");

// "view" => 보여줄 html 파일이 들어있는 폴더
nunjucks.configure("view", {
    express: app,
    // autoescape: true,
    watch: true
});


app.use("/", express.static(path.join(__dirname, "public")));
app.use("/img", express.static(path.join(__dirname, "img")));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// 쿠키 세션 설정
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    }
}));

// passport 설정
app.use(passport.initialize());
app.use(passport.session());
passportConfig();

app.use("/", indexRouter);
app.use("/main", isLoggedIn, mainRouter);
app.use("/about", isLoggedIn, aboutRouter);
app.use("/skills", isLoggedIn, skillsRouter);
app.use("/projects", isLoggedIn, projectsRouter);
app.use("/contact", isLoggedIn, contactRouter);
app.use("/client", clientRouter);
// app.use("/", indexRouter);
// app.use("/main", mainRouter);
// app.use("/about", aboutRouter);
// app.use("/skills", skillsRouter);
// app.use("/projects", projectsRouter);
// app.use("/contact", contactRouter);


// app.use("/login", loginRouter);


// 에러처리
app.use((req, res, next) => {
    const error = new Error("에러입니다.");
    error.status = 404;
    next(error);
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send('error');
})

app.listen(app.get("port"), () => {
    console.log(app.get("port") + " PORT OPEN !!");
})