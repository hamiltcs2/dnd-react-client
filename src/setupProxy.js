const createProxyMiddleware = require('http-proxy-middleware');
 
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'https://dnd-react.herokuapp.com/', // API endpoint 1 https://dnd-react.herokuapp.com/
      changeOrigin: true,
      pathRewrite: {
        "^/api1": "",
      },
      headers: {
        Connection: "keep-alive"
      }
    })
  );
  app.use(
    createProxyMiddleware('/graphql', {
      target: 'https://dnd5eapi.co/graphql', // API endpoint 2 https://dnd5eapi.co/graphql/
      changeOrigin: true,
      pathRewrite: {
        "^/graphql": "",
      },
      headers: {
        Connection: "keep-alive"
      }
    })
  );
}