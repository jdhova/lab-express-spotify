
const express = require("express")
const app = express()
const bodyParser = require('body-parser')

const SpotifyWebApi = require('spotify-web-api-node');

 
// credentials are optional
// const spotifyApi = new SpotifyWebApi({
//   clientId: '9e735e5e216a4c38a10c3a6170308890',
//   clientSecret: 'd9d39c3ec72d44c3a778ad19b4ad7791',
//  // redirectUri: 'http://www.example.com/callback'
// });

var clientId ='9e735e5e216a4c38a10c3a6170308890',
    clientSecret ='d9d39c3ec72d44c3a778ad19b4ad7791';

const spotifyApi = new SpotifyWebApi({
    clientId : clientId,
    clientSecret : clientSecret
  });



// Middleware
app.use(bodyParser.urlencoded({extended:false}));

var hbs = require("hbs");
hbs.registerPartials(__dirname + '/views/partials');

app.set('views', __dirname + '/views');   // handle bars
app.set('view engine', 'hbs');

app.use(express.static("public"));

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err);
});





app.get("/searchArtist", function(req, res) {
   res.render("searchArtist")

   
     
  })

  app.get("/searchResult", function(req, res) {
    res.render("searchResult")
 
    //console.log("yes")
      
   })


app.post("/searchArtist", function(req, res) {
   
    spotifyApi.searchArtists(req.body.searchArtist)
        .then(result => {   
        res.render("searchResults", {search : result.body.artists.items})  //item    
        })
        .catch(err => {
            console.log(err) 
        })
})

 




 app.get("/albums/:artistId", function(req, res) {
     spotifyApi.getArtistAlbums(req.params.artistId)
     .then( result => {
      res.render( "albumsResult",{albums : result.body.items})   
          },
           function(err) {
           console.error(err);
      }
    );    
   
});





app.get("/songs/:songId", function(req, res) {
   // debugger
    spotifyApi.getAlbumTracks(req.params.songId)
  .then( result => {
    //  debugger
   res.render("songResult",{songs : result.body.items})
   
   // console.log(data.body);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
  
});


  









app.listen(3000, () => {
    console.log("hello working")
});