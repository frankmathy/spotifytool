import express from 'express';
import cors from 'cors';
import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3001;

app.post('/login', async (req, res) => {
  const { code } = req.body;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });
});
