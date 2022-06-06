import React, { useState, useEffect } from 'react';

import useAuth from './hooks/useAuth';
import Player from './Player';
import TrackSearchResult from './TrackSearchResult';
import SpotifyWebApi from 'spotify-web-api-node';
import {
  DashBoardContainer,
  PlaylistNameInput,
  ArtistTitleInput,
  ResultsContainer,
  PlayerContainer,
  Button
} from './styles/Dashboard.styles';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID
});

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  const [artistTitleText, setArtistTitleText] = useState('');
  const [playlistName, setPlaylistName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();

  function chooseTrack(track) {
    setPlayingTrack(track);
  }

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  const searchTitles = () => {
    if (!artistTitleText) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    (async () => {
      var searchLines = artistTitleText.split('\n');
      const searchResultsForLines = [];

      for (const searchLine of searchLines) {
        if (searchLine.trim().length >= 5) {
          const { body } = await spotifyApi.searchTracks(searchLine);
          if (cancel) return;
          if (body.tracks.items.length > 0) {
            searchResultsForLines.push(
              body.tracks.items.map(track => {
                return {
                  artist: track.artists[0].name,
                  title: track.name,
                  uri: track.uri
                };
              })
            );
          }
        }
      }
      setSearchResults(searchResultsForLines);
    })();

    return () => (cancel = true);
  };

  return (
    <DashBoardContainer>
      <h1>Create Spotify Playlist from Titles</h1>
      <p>
        <ArtistTitleInput
          name="artistTitleInput"
          placeholder="Search Songs/Artists"
          value={artistTitleText}
          rows={15}
          cols={80}
          onChange={e => setArtistTitleText(e.target.value)}
        />
      </p>
      <p>
        <Button onClick={searchTitles}>Search Songs</Button>
      </p>
      <ResultsContainer>
        {searchResults.map(track => (
          <TrackSearchResult
            track={track[0]}
            key={track[0].uri}
            chooseTrack={chooseTrack}
          />
        ))}
      </ResultsContainer>
      <PlaylistNameInput
        type="search"
        placeholder="Enter Spotify Playlist Name"
        value={playlistName}
        onChange={e => setPlaylistName(e.target.value)}
      />
      <PlayerContainer>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </PlayerContainer>
    </DashBoardContainer>
  );
};

export default Dashboard;
