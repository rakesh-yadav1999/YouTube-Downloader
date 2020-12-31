const ytdl = require("ytdl-core");
const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");
const youtubedl = require('youtube-dl')
const hbs = require('hbs');

app.use(express.static(__dirname));
app.use(express.urlencoded({extended : false}));
app.set('view engine', 'hbs');

var url = "";

app.get("/", (req, res) => {
    res.render('home');
});

app.post("/home", async (req, res) => {
    url = req.body.link;

    ytdl.getInfo(url).then(info => {
      
   
        var data = info.player_response.streamingData.formats[1].url;

        const video = youtubedl(data);
           
          // Will be called when the download starts.
          video.on('info', function(info) {
            console.log('Download started')
            console.log('filename: ' + info._filename)
            console.log('size: ' + info.size)
            console.log("Download Finished");
            res.render('Successfull');
          });
           
          // var name = info.videoDetails.title + ".mp4";
          // console.log(name);
          video.pipe(fs.createWriteStream('video.mp4'));
   });

});

app.get("*", (req, res) => {
  res.render('error');
});


app.listen(8000,"127.0.0.1");