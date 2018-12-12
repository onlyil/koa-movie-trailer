const Koa = require('koa')
const { connect } = require('../db/init')
const app = new Koa()
const port = 5200

// connect mongodb
;(async () => {
  await connect()
})()

app.use(async (ctx, next) => {
  ctx.body = 'home'
})

app.listen(port)
console.log(`Server listening on port ${port}`)
