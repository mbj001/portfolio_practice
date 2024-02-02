// 세션 쿠키 처리 작업을 편하게 하기 위한 모듈 => passport
//      strategy(전략) - 로그인 인증 방식
//          1. local strategy : 로컬 db 에서 로그인 인증
//          2. Social Authentication: 소셜 네트워크 로그인 인증
//      API 동작 : 사용자가 passport 에 인증 요청 => passport 인증 성공 / 실패 시 제어 방법 결정
//      로그인 과정
//          1. 로그인 요청이 라우터로 들어옴
//          2. 미들웨어를 거치고 passport.authenticate() 호출
//          3. authenticate 에서 passport/localStrategy.js 호출

const passport = require("passport");

exports.login = function(req, res, next){
    console.log("***** controller => auth.js => exports.login");
    passport.authenticate("local", (authError, user, info) => {
        if(authError){
            console.log("***** controller => auth.js => exports.login => if(authError)");
            console.error(authError);
            return next(authError);
        }
        if(!user){
            console.log("***** controller => auth.js => exports.login => if(!user)");
            return res.redirect(`/?error=${info.message}`);
        }
        return req.login(user, (loginError) => {
            if(loginError){
                console.log("***** controller => auth.js => exports.login => if(loginError)");
                console.error(loginError);
                return next(loginError);
            }
            console.log("***** controller => auth.js => exports.login => req.login COMPLETE !!!!!");
            return res.redirect("/");
        });
    })(req, res, next);         // 미들웨어 안의 미들웨어는 (req, res, next) 를 붙인다.
}

exports.logout = function(req, res, next){
    console.log("***** controller => auth.js => exports.logout");
    req.logout(() => {
        res.redirect("/");
    })
}

// exports.join = async(req, res, next) => {
//     const {userid, userpass} = req.body;
//     try{
//         const select_query = `select * from mbj_portfolio01_login where ?`;
//         conn.query(select_query, [{userid: userid}], async (err, select_result, fields) => {
//             if(err){
//                 console.error(err);
//             }
//             else{
//                 if(select_result.length == 0){
//                     return res.redirect("/register?error=exist")
//                 }
//                 const salt_rounds = Number(process.env.SALT_ROUNDS)
//                 const hash_pass = await bcrypt.hash(userpass, salt_rounds);
//                 const insert_query = `insert into mbj_portfolio01_login (userid, userpass) values (?, ?)`;
//                 conn.query(insert_query, [userid, hash_pass], (err, insert_result, fields) => {
//                     if(err){
//                         console.error(err);
//                     }
//                 })
//             }
//         })
//     }
//     catch(error){
//         console.error(error);
//         return next(error);
//     }
// }
