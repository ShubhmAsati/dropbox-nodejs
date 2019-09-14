
require('isomorphic-fetch'); 
var fs = require('fs');
var request = require("request");
var Dropbox = require('dropbox').Dropbox;

//get access token from dropbox UI . this is OAuth2 token used by dropbox to verify user details
const accessToken = 'generate-oauth-token-from-dropbox-ui';
var dbox = new Dropbox({ accessToken: accessToken });



//get list of files and folders
dbox.filesListFolder({path: ''})
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });


//upload file from local directory to drop box 
fs.readFile( __dirname + 'apple.png', (err, data) => {
  dbox.filesUpload({ path: '/demo.png', contents: data })
      .then(function (response) {
      console.log(response);
  })
      .catch(function (error) {
      console.error(error);
  });
});


//upload files from remote url to dropbox ..
//for more details https://www.dropbox.com/developers/documentation/http/documentation#files-save_url

var myHeader = { "Content-Type":"application/json","Authorization":"Bearer "+accessToken}

var myJSONObject = {"path":"/test.png","url":"https://example/test.png"};

var myRequest = {
  url: "https://api.dropboxapi.com/2/files/save_url",
  method: "POST",
  json: true,   // <--Very important!!!
  headers: myHeader,
  body: myJSONObject
};

request(myRequest, function (error, response, body){
    console.log(response);
});