const mongoose = require('mongoose')
const db = 'mongodb://localhost/movie-trailer'
const maxReconnectCount = 3
let reconnectCount = 0

exports.connect = () => {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }
    mongoose.connect(db, {
      useNewUrlParser: true
    })
    mongoose.connection.on('disconnected', () => {
      if (reconnectCount < maxReconnectCount) {
        mongoose.connect(db, {
          useNewUrlParser: true
        })
        reconnectCount ++
      } else {
        throw new Error('挂了吧')
      }
    })
    mongoose.connection.on('error', e => {
      throw new Error(e)
    })
    mongoose.connection.once('open', () => {
      resolve()
      console.log('Mongo connect success!')
    })
  })
}
