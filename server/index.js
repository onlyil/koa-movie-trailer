const Koa = require('koa')
const app = new Koa()
const port = 5200

app.use(async (ctx, next) => {
  ctx.body = 'home'
})

app.listen(port)
console.log(`Server listening on port ${port}`)
