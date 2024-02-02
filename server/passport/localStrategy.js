const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");       // 암호화

const conn = require("../config/mysql")
dotenv.config();

module.exports = () => {
    
    passport.use(new LocalStrategy({
        usernameField: "userid",
        passwordField: "userpass",
        passReqToCallback: false
    }, async(userid, userpass, done) => {
        console.log("***** passport => localStrategy.js");
        try{
            console.log("***** passport => localStrategy.js => try");
            const select_query = `select * from mbj_portfolio01_login where ?`;
            conn.query(select_query, [{userid: userid}], async (err, select_result, fields) => {
                if(err){
                    console.error(err);
                }
                else{
                    if(select_result.length == 0){
                        done(null, false, {message: "아이디를 다시 확인하세요."});
                    }
                    else{
                        const result = await bcrypt.compare(userpass, select_result[0].userpass);

                        if(result){
                            const user = select_result[0]
                            console.log("***** passport => localStrategy.js => try => ID, PW CHECK COMPLETE!!!");
                            done(null, user);
                        }
                        else{
                            done(null, false, {message: "비밀번호가 틀렸습니다.."});
                        }
                    }
                }
            })
        }
        catch(error){
            console.log("***** controller => localStrategy.js => catch");
            console.error(error);
            done(error);
        }
    }))
}