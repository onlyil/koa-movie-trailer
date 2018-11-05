const axios = require('axios')

const geteMovieInfo = uid => axios({
  url: `http://api.douban.com/v2/movie/subject/${uid}`,
})

;(async () => {
  const res = await geteMovieInfo('27615441')
  console.log('movie info: ', res.data)
})()