const PROXY_CONFIG = [
    {
        context: [
            '/token',
            '/validate',
            '/oauth2/authorization/google',
        ],
        target: "http://localhost:8080/",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/": ""
        }
    }
]

module.exports = PROXY_CONFIG;