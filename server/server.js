const path = require('path');
const express = require('express');
const cors = require('cors');
const SpotifyWebApi = require('spotify-web-api-node');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'client', 'build', 'index.html  ')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.post('/login', async (req, res) => {
  const { code } = req.body;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });

  try {
    const {
      body: { access_token, refresh_token, expires_in }
    } = await spotifyApi.authorizationCodeGrant(code);
    res.json({ access_token, refresh_token, expires_in });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

app.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken
  });

  try {
    const {
      body: { access_token, expires_in }
    } = await spotifyApi.refreshAccessToken();
    res.json({ access_token, expires_in });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

app.listen(PORT, err => {
  if (err) console.log(err);
  console.log('Listening on port ', PORT);
});
