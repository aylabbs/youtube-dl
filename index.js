const express = require('express')
const app = express()
const port = process.env.PORT || 9897;
const ytdl = require('ytdl-core');
const audioSplicer = require('./splicer');





app.get('/download', async (req, res) => {
  try {
    if (!req.query.v) return res.end('Invalid link');
    const link = `https://www.youtube.com/?v=${req.query.v}`;
    console.log(req.query)
    if (req.query.hasAudio === 'true') {
      res.attachment(`${req.query.name}.mp4`)
      ytdl(link, { quality: req.query.quality }).pipe(res)        
    } else {
      res.attachment(`${req.query.name}.mkv`)
      audioSplicer(req, res, link)
    }
  } catch (e) {
    res.end('Error occurred. Check link and try again')
  }
})
app.get('/watch', async (req, res) => {
  try {
    if (!req.query.v) return res.end('Invalid link');
    const link = `https://www.youtube.com/?v=${req.query.v}`;
    const info = await ytdl.getBasicInfo(link)
    const { formats } = info
    const mp4Formats = formats.filter(el => el.mimeType.split(';')[0] == 'video/mp4')
    const audio = formats.filter(el => el.mimeType.split(';')[0] == 'audio/mp4')
    // console.log(info)
    let html = '<HTML>'
    mp4Formats
      .sort((first, second) => first.height > second.height )
      .forEach(format => html += 
        `<a href="/download?v=${req.query.v}&hasAudio=${!!format.audioChannels}&quality=${format.itag}&name=${info.title}"
          >${format.qualityLabel} - ${format.quality} ${format.audioChannels ? ' - with audio' : ''}</a><br />`
      )
    html += '</HTML>'
    res.end(html)
  } catch (e) {
    res.end('Error occurred. Check link and try again')
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))