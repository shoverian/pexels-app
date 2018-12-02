// API Documentation: https://www.pexels.com/api/documentation/

// var env = require('./.env');
var fs = require('fs')
var http = require('http')
// var path = require('path')
var targetUrl = 'api.pexels.com'
// Create a .env file with only contents: export API_KEY="Th1sI5WheR3YourAPIk3yGo3s"
var authKey = process.env.API_KEY
var randomNumber = totesRando(1, 1000)

http.get({
  hostname: targetUrl,
  port: 80,
  path: '/v1/curated?per_page=1&page=' + randomNumber,
  headers: {
    'Authorization': authKey
  },
  agent: false // create a new agent just for this one request
}, function (res) {
  var body = ''
  res.on('data', function (chunk) {
    body += chunk
  })
  res.on('end', function () {
    // var filePath = path.normalize('./wallpaper-test.jpg');
    // response.data.pipe(fs.createWriteStream(filePath));
    var theResponse = JSON.parse(body)
    // Change url string from https to http
    theResponse = theResponse.photos[0].src.original.replace('https', 'http')
    // Log for debugging
    // console.log('Got the url: ' + theResponse)
    // Write file named wallpaper.jpg to disk
    var file = fs.createWriteStream('wallpaper.jpg')
    http.get(theResponse, function (response) {
      response.pipe(file)
    }).on('error', function (error) {
      console.log(error)
    })
  })
}).on('error', function (error) {
  console.log('Whoops: ' + error)
})

function totesRando (lowEnd, highEnd) {
  // Generate a random number to access a random pexels image
  var theNumber = Math.floor(Math.random() * highEnd) + lowEnd
  return theNumber
}
