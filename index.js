const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const ytdl = require('ytdl-core');





app.get('/download', async (req, res) => {
  try {
    if (!req.query.v) return res.end('Invalid link');
    const link = `https://www.youtube.com/?v=${req.query.v}`;
    res.attachment(`${req.query.name}.mp4`)
    ytdl(link, { quality: req.query.quality }).pipe(res)  
  } catch (e) {
    res.end('Error occurred. Check link and try again')
  }
})
app.get('/watch', async (req, res) => {
  try {
    if (!req.query.v) return res.end('Invalid link');
    const link = `https://www.youtube.com/?v=${req.query.v}`;
    const info = await ytdl.getBasicInfo(link)
    let html = '<HTML>'
    info.formats
    .sort((first, second) => first.height > second.height )
    .forEach(format => html = 
      format.audioChannels && format.qualityLabel && format.mimeType.includes('mp4') ?
        `${html}<a
          href="/download?v=${req.query.v}&quality=${format.itag}&name=${info.title}"
          >${format.qualityLabel} - ${format.quality}</a><br />` :
        html)
    html += '</HTML>'
    res.end(html)
  } catch (e) {
    res.end('Error occurred. Check link and try again')
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))