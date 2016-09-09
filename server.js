var express = require('express');
var app = express();

var request = require('request');
var cheerio = require('cheerio');

var mongojs = require('mongojs');
var databaseUrl = 'scraper';
var collections = ["scrapedData"];

var db = mongojs(databaseUrl, collections);
db.on('error', function(err) {
  console.log('database error: ', err )
});

//main route
app.get('/', function(req, res) {
  res.send('Hello world');
});

// gets data and sends to browser
app.get('/all', function(req, res){
  db.scrapedData.find({}, function(err, found) {
    if (err) {
      console.log(err);
    } else {
      res.json(found);
    }
  });
});

// web scraping route that takes data from a site and places it in mongodb
app.get('/scrape', function(req, res) {
  request('https://news.ycombinator.com/', function(error, response, html){
    var $ = cheerio.load(html);
    $('.title').each(function(i, element) {
      var title = $(this).children('a').text();
      var link = $(this).children('a').attr('href');
      if(title && link) {
        db.scrapedData.save({
          title: title,
          link: link
        },
        function(err, saved) {
          if (err) {
            console.log(err);
          } else {
            console.log(saved);
          }
        });
      }
    });
  });
    res.send('Scrape Complete');
  });

  app.listen('3000', function() {
    console.log('App running on port 3000');
  });
