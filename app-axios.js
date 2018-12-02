// API Documentation: https://www.pexels.com/api/documentation/

var fs = require('fs')
var path = require('path')
var axios = require('axios')
var randomNumber = totesRando(1, 1000)
var targetUrl = 'https://api.pexels.com/v1/curated?per_page=1&page=' + randomNumber
// Create a .env file with only contents: export API_KEY="Th1sI5WheR3YourAPIk3yGo3s"
var authKey = process.env.API_KEY

axios.get(targetUrl, { headers: { Authorization: authKey } })

// Get the response and pull the image details
  .then(function (response) {
    // Get the iamge 'id:' field and append it to https://api.pexels.com/v1/photos/:id to get the download url
    // var imageId = response.data.photos[0].id;
    // Get the url in 'original:' field from the returned data of https://api.pexels.com/v1/photos/36369
    var theSrc = response.data.photos[0].src.original
    console.log('This is the src: ' + theSrc)

    return theSrc
  })
  .then(function (response) {
    // Initiate download from 'original:' url
    axios.get(response, { headers: { Authorization: authKey }, responseType: 'stream' })
      .then(function (response) {
        // Basic write stream: https://github.com/axios/axios#axios-api (see responseType: 'stream' sample)
        // Save to current directory ./
        var filePath = path.normalize('H:/My Pictures/pexels/wallpaper.jpg')
        response.data.pipe(fs.createWriteStream(filePath))
      })
      .catch(function (error) {
        console.log('There was this error: ' + error)
      })

    // Axios image download: https://futurestud.io/tutorials/download-files-images-with-axios-in-node-js
  })
  .catch(function (error) {
    console.log(error)
  })

function totesRando (lowEnd, highEnd) {
  // Generate a random number to access a random pexels image
  var theNumber = Math.floor(Math.random() * highEnd) + lowEnd
  return theNumber
}
