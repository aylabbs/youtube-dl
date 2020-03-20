const express = require('express')
const app = express()
const port = process.env.PORT
const ytdl = require('ytdl-core');





app.get('/', (req, res) => {
  console.log(req.query)
  if (!req.query.v) return res.end('Invalid link');
  const link = `https://www.youtube.com/?v=${req.query.v}`;
  console.log(link)

  res.attachment('video.mp4')
  ytdl(link).pipe(res)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))