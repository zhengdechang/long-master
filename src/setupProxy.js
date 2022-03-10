

const { createProxyMiddleware } = require("http-proxy-middleware")
module.exports = function (app) {
    app.use(
        createProxyMiddleware("/base-adapter", {
            target: "http://192.168.73.158:8888/", //配置转发目标地址(能返回数据的服务器地址)
            changeOrigin: true, //控制服务器接收到的请求头中host字段的值
            // pathRewrite: { "^/api1": "" },
        }),
    )
}