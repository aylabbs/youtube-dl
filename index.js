const express = require('express')
const app = express()
const port = process.env.PORT
const ytdl = require('ytdl-core');





app.get('/watch', async (req, res) => {
  if (!req.query.v) return res.end('Invalid link');
  const link = `https://www.youtube.com/?v=${req.query.v}`;
  const info = await ytdl.getInfo(link)
  console.log(info)
  res.attachment('video.mp4')
  ytdl(link).pipe(res)
})
app.get('/info', async (req, res) => {
  if (!req.query.v) return res.end('Invalid link');
  const link = `https://www.youtube.com/?v=${req.query.v}`;
  const info = await ytdl.getInfo(link)
  console.log(info)
  // res.attachment('video.mp4')
  // ytdl(link).pipe(res)
  res.end(JSON.stringify(info))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))