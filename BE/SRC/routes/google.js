var express = require('express');
var router = express.Router();
const {OAuth2Client} = require('google-auth-library');
const axios =require( 'axios');
const passport = require('passport')

// Download your OAuth2 configuration from the Google
const keys = require('../key.json');
const { request } = require('express');
const oAuth2Client=new OAuth2Client(
      keys.web.client_id,
      keys.web.client_secret,
      keys.web.redirect_uris[0]
    );

router.get('/google/login',async function(req, res) {
   
  // Generate the url that will be used for the consent dialog.
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email'],
  });
  res.redirect(authorizeUrl)
})
router.get('/google', async function(req, res) {
  const r = await oAuth2Client.getToken(req.query.code);
  // Make sure to set the credentials on the OAuth2 client.
  oAuth2Client.setCredentials(r.tokens);
  console.log('Tokens acquired.');
  const url = 'https://people.googleapis.com/v1/people/me?personFields=emailAddresses,names';
  const res1 = await oAuth2Client.request({url});
  console.log({name:res1.data.names[0].displayName,
    email:res1.data.emailAddresses[0].value});
  console.log(res1.data);
  delete oAuth2Client;
  // const uri='https://www.googleapis.com/oauth2/v3/userinfo?access_token='+r.tokens.access_token;
 

  res.send({name:res1.data.names[0].displayName,
    email:res1.data.emailAddresses[0].value})
})

module.exports = router;