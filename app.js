const http = require('http')
const template = require("art-template")
const path = require('path')
const serveStatic = require('serve-static')
// 引入处理日期的第三方模块
const dateformat = require('dateformat')

const router = require('./router/index')

// 实现静态资源访问服务
const serve = serveStatic(path.join(__dirname, 'public'))

// 配置模板的根目录
template.defaults.root = path.join(__dirname, 'views')
// 配置模板默认后缀
template.defaults.extname = '.html'
// 处理日期格式的方法
template.defaults.imports.dateformat = dateformat

// 数据库连接
require('./model/connect')

const app = http.createServer()

app.on('request', (req, res) => {
  // 第三个参数是必选参数
 router(req, res, () => {})
 serve(req, res, () => {})
})

app.listen(3000, () => console.log('Server is running port 3000...'))
