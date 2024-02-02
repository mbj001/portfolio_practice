exports.isLoggedIn = (req, res, next) => {
    console.log("***** mmiddleware => index.js => exports.isLoggedIn");
    if(req.isAuthenticated()){
        next();     
    }
    else{
        res.status(403).send("로그인이 필요합니다.");
    }
}

exports.isNotLoggedIn = (req, res, next) => {
    console.log("***** mmiddleware => index.js => exports.isNotLoggedIn");
    if(!req.isAuthenticated()){
        next();         // next() ==> routers -> index.js 에서 isNotLoggedIn 다음의 매개변수인 login으로 이동한다.
    }
    else{
        const message = encodeURIComponent("로그인 한 상태입니다.");
        res.rediect(`/?error=${message}`);
    }
}