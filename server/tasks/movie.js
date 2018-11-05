const cp = require('child_process')
const path = require('path')

;(async () => {
  const child = cp.fork(path.resolve(__dirname, '../crawler/trailer-list.js'))
  let invoked = false // flag: child is invoked

  child.on('error', err => {
    if (invoked) return
    invoked = true
    console.error(err)
  })

  child.on('exit', code => {
    if (invoked) return
    invoked = true
    if (code !== 0) {
      console.warn(`exit code: ${code}`)
    }
  })

  child.on('message', message => {
    console.log(message)
  })
})()