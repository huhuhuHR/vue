// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');
module.exports = {
  // production 生产环境
  build: {
    // 构建环境
    env: require('./prod.env'),
    // 构建输出的index.html文件
    index: path.resolve(__dirname, '../dist/index.html'),
    // 构建输出的静态资源路径
    assetsRoot: path.resolve(__dirname, '../dist'),
    // 构建输出的二级目录
    assetsSubDirectory: 'static',
    // 构建发布的根目录，可配置为资源服务器域名或 CDN 域名
    assetsPublicPath: '/',
    // 是否开启 cssSourceMap
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    // 需要使用 gzip 压缩的文件扩展名
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    // 运行“build”命令行时，加上一个参数，可以在构建完成后参看包分析报告
    // true为开启，false为关闭
    bundleAnalyzerReport: process.env.npm_config_report
  },
  // dev 开发环境
  dev: {
    // 构建环境
    env: require('./dev.env'),
    port: 1111,
    // 是否自动打开浏览器
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    assetsPublicPath: '/',
    // proxyTable 代理的接口（可跨域）
    proxyTable: {
      // proxy all requests starting with /api to jsonplaceholder
      //example http://localhost:1110/hello => /huhuhu/hello
      // #pathRewrite: {
      // #'^/huhuhu': '/huhuhu' //需要rewrite重写的.需要项目名字就加，不需要就不加
      // #}
      '/huhuhu': {
        target: 'http://localhost:1110', // 接口域名
        changeOrigin: true, //是否跨域
        pathRewrite: {
          '^/huhuhu': '' //需要rewrite重写的.需要项目名字就加，不需要就不加
        }
      },
      '/nginximage': {
        target: 'http://localhost:7002', // 接口域名
        changeOrigin: true, //是否跨域
        pathRewrite: {
          '^/nginximage': 'image' //需要rewrite重写的.需要项目名字就加，不需要就不加
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
};
