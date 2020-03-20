const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const ytdl = require('ytdl-core');





app.get('/watch', async (req, res) => {
  if (!req.query.v) return res.end('Invalid link');
  const link = `https://www.youtube.com/?v=${req.query.v}`;
  const info = await ytdl.getInfo(link)
  console.log(info)
  let html = ''
  
  res.attachment('video.mp4')
  ytdl(link).pipe(res)
})
app.get('/info', async (req, res) => {
  try {
    if (!req.query.v) return res.end('Invalid link');
    const link = `https://www.youtube.com/?v=${req.query.v}`;
    const info = await ytdl.getBasicInfo(link)
    console.log(info)
    let html = ''
    info.formats.forEach(format => html = format.mimeType.includes('mp4') ? html + format.qualityLabel + "<br />" : html)
    // res.attachment('video.mp4')
    // ytdl(link).pipe(res)
    // res.end(JSON.stringify(info))
    res.end(html)
  
  } catch (e) {
    res.end('Error occurred. Check link and try again')
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))