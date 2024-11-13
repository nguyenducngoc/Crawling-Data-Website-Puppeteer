const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const router = express.Router();

const EXTENSION_PATH = path.resolve('./uBlock0.chromium');
//Crawl Detail 
const crawlDetail = async(page, movieUrl) => {
  await page.goto(movieUrl,{waitUntil: 'networkidle2'})
  const movieDetails = await page.evaluate(() => {
    const movieTitle = document.querySelector(".myui-content__detail h1.title")?.innerText
    const relaseYear = document.querySelector(".myui-media-info .info-block h6")?.innerText
    const thumbnail = document.querySelector(".myui-content__thumb img").getAttribute("src")
    const thumb = thumbnail ? `https://motphim.sx/${thumbnail}`: null
    const url_play = document.querySelector(".myui-vodlist__thumb img").getAttribute("href")
    const episode = document.querySelector(".myui-media-info .badge")?.innerText
    const rating = document.querySelector("#average")?.innerText
    return {
      movieTitle,
      relaseYear,
      thumb,
      episode,
      rating
    }
  })
  return movieDetails
}

//Crawl Home
const crawlMovies = async (browser, url) => {
  const page = await browser.newPage()
  const movies = []

  try {
    for (let pageNumber = 1; pageNumber < 13; pageNumber++) {
      const url_page = `${url}?page=${pageNumber}`
      console.log(`Crawling: ${url_page}`)
      await page.goto(url_page, { waitUntil: 'networkidle2'})

      const movieUrls = await page.evaluate(() => {
        const elements = document.querySelectorAll("li.col-lg-6.col-md-6.col-sm-4.col-xs-3 .myui-vodlist__thumb")
        console.log(elements)
        return Array.from(elements).map(elem => elem.getAttribute("href"))
      })
      for (const movieUrl of movieUrls) {
        const fullLink = `${movieUrl}`
        console.log(fullLink)
        const movieDetails = await crawlDetail(page, fullLink)
        if (!movieDetails) {
          continue
        }
        const movieEmbed = await crawlEmbed(page, `${fullLink}/tap-full`)
        movies.push({
          title: movieDetails.movieTitle,
          url: movieUrl,
          relase: movieDetails.relaseYear,
          thumb: movieDetails.thumb,
          episode: movieDetails.episode,
          rating: movies.rating,
          m3u8Url: movieEmbed
        })
      }
    }
  } catch (error) {
    console.error(error)
  } finally {
    browser.close()
  } return movies
}

//Clawer m3u8
const crawlEmbed = async(page, url_play) => {
  await page.goto(`${url_play}`)

  let m3u8Url = null
  //server check
  const serverText = await page.evaluate(() => {
    const linkElement = document.querySelector('#ploption a.streaming-server.current')
    return linkElement ? linkElement.textContent.trim() : null
  })
  if (serverText == "DN") {
    page.on('response', async (response) => {
        const requestUrl = response.url()
        if (requestUrl.endsWith('.m3u8')) {
          m3u8Url = requestUrl
          console.log("Link DN:", m3u8Url)
        } 
      }) 
      await page.waitForSelector('video.jw-video.jw-reset',{timeout:3000})
    
        const videoElement = await page.$('video.jw-video.jw-reset')
        if (videoElement) {
          await videoElement.evaluate(video => video.play())
        } 
  } else if (serverText == "HN") {
    const m3u8Url = await page.evaluate(() => {
      const iframeElement = document.querySelector('iframe[src*="embed"]')
      return iframeElement ? iframeElement.getAttribute('src') : null
        }) 
        console.log("Link HN:",m3u8Url)
  } 
  return m3u8Url
}

//main
const main = async (url) => {
  
  const pathToExtension = path.join(process.cwd(), './uBlock0.chromium');
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`,
    ],
  });
  try {
    const movies = await crawlMovies(browser, url)
    console.log(movies)
    return movies
  } catch (error) {
    console.error(error)
  } finally {
    await browser.close()
  }
}
module.exports = router
module.exports = {crawlDetail, crawlMovies, crawlEmbed, main}
