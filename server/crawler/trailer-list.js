const pptr = require('puppeteer')

const url = 'https://movie.douban.com/explore#!type=movie&tag=%E8%B1%86%E7%93%A3%E9%AB%98%E5%88%86&sort=time&page_limit=20&page_start=0'

;(async () => {
  const browser = await pptr.launch()
  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: 'networkidle2',
  })
  page.waitForSelector('.more')
  const as = await page.$$('.list-wp a.item')
  const movieList = []
  for (let i = 0; i < as.length; i++) {
    let banner = await as[i].$eval('img', img => img.src)
    let name = await as[i].$eval('p', p => p.innerText.split(' ')[0])
    let score = await as[i].$eval('p', p => p.innerText.split(' ')[1])
    movieList.push({
      banner,
      name,
      score,
    })
  }
  console.log(movieList)
  await browser.close()
})()