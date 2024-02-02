


// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = (app) => {
//     app.use(
//         "/client",
//         createProxyMiddleWare({
//             target: "http://localhost:3001",
//             changeOrigin: true
//         })
//     )
// }

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(
        "/client",
        createProxyMiddleware({
            target: "http://localhost:3001",
            changeOrigin: true
        })
    )
}