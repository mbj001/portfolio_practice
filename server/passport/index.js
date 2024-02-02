const passport = require("passport");
// const local = require("../localStorage");
const local = require("./localStrategy");
const conn = require("../config/mysql");

module.exports = () => {
    // 로그인 시 실행, req.session 에 저장할 메서드
    passport.serializeUser((user, done) => {
        console.log("***** passport => index.js => passport.serializeUser");
        done(null, user.userid);        // 첫 번째 인자는 에러 발생 시, 두 번째 인자는 저장하고 싶은 데이터
    })

    // 매 페이지 요청 시 실행
    // serializeUser 에서 세션에 저장했던 아이디 값을 받아 db의 사용자 정보를 조회
    // 조회 정보를 req.user 정보에 저장, router 에서 req.user 를 통해 사용함
    passport.deserializeUser((id, done) => {
        console.log("***** passport => index.js => passport.deserializeUser");
        const select_query = `select * from mbj_portfolio01_login where ?`;
        conn.query(select_query, [{userid: id}], (err, select_result, fields) => {
            if(err){
                console.log("***** passport => index.js => passport.deserializeUser => err");
                err => done(err);
            }
            else{
                console.log("***** passport => index.js => passport.deserializeUser => Not err");
                const user = select_result[0];
                done(null, user);
            }
        })
    })
    local();
}

// 로그인 시
// 1. 라우터를 통해 로그인 요청
// 2. 라우터에서 passport.authenticate 메서드 호출
// 3. 로그인 전략 수행
// 4. 로그인 성공 시 사용자 정보 객체와 함께 req.login 호출
// 5. req.login 메서드를 이용해서 passport.serializeUser 호출
// 6. req.session 에는 id만 저장
// 7. 로그인 완료

// 로그인 완료 시
// 1. 요청 들어옴
// 2. 라우터가 요청이 도달하기 전에(페이지에 들어가기 전에) passport.session 미들웨어가 passport.deserializeUser 메서드 호출
// 3. req.session 에 저장된 id 정보를 이용해서 db 조회
// 4. 조회된 정보는 req.user에 저장됨
// 5. req.user 를 이용해 라우터에서 객체 사용