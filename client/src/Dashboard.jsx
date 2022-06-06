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
  Button,
  PageFooter,
  StatusMessage
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
  const [statusMessage, setStatusMessage] = useState('');

  function chooseTrack(track) {
    setPlayingTrack(track);
  }

  const convertFrom2Liners = () => {
    var searchLines = artistTitleText.split('\n');
    const filteredLines = searchLines.filter(line => line.trim().length > 0);
    var result = '';
    var lineCount = 0;
    filteredLines.forEach(line => {
      if (lineCount++ % 2 === 0) {
        result += line;
      } else {
        result += ' - ' + line + '\n';
      }
    });
    setArtistTitleText(result);
  };

  const createSpotifyPlaylist = () => {
    (async () => {
      const { body } = await spotifyApi.createPlaylist(playlistName);
      const tracks = searchResults.map(result => {
        return result[0].uri;
      });
      await spotifyApi.addTracksToPlaylist(body.id, tracks);
      setStatusMessage(`Playlist ${playlistName} created.`);
    })();
    setPlaylistName('');
  };

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    setSearchResults([]);
    setPlayingTrack(null);
    setStatusMessage('');
  }, [artistTitleText]);

  const searchTitles = () => {
    if (!artistTitleText) return setSearchResults([]);
    if (!accessToken) return;

    setPlayingTrack(null);
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
      setStatusMessage(`${searchResultsForLines.length} titles found`);
    })();

    return () => (cancel = true);
  };

  return (
    <DashBoardContainer>
      <h1>Create Spotify Playlist from Titles</h1>
      <ArtistTitleInput
        name="artistTitleInput"
        placeholder="Lines with Artist - Title"
        value={artistTitleText}
        rows={15}
        cols={80}
        onChange={e => setArtistTitleText(e.target.value)}
      />
      <Button
        onClick={searchTitles}
        disabled={artistTitleText.trim().length === 0}
      >
        Search Songs
      </Button>
      <Button
        onClick={() => {
          setArtistTitleText('');
        }}
        disabled={artistTitleText.trim().length === 0}
      >
        Clear
      </Button>
      <Button
        onClick={convertFrom2Liners}
        disabled={artistTitleText.trim().length === 0}
      >
        2 Liners
      </Button>
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
        type="text"
        placeholder="Enter Spotify Playlist Name"
        value={playlistName}
        hidden={searchResults.length === 0}
        onChange={e => setPlaylistName(e.target.value)}
      />
      <Button
        onClick={createSpotifyPlaylist}
        disabled={
          searchResults.lastIndexOf === 0 || playlistName.trim().length === 0
        }
      >
        Create Spotify Playlist
      </Button>
      <p />
      <StatusMessage>{statusMessage}</StatusMessage>
      <PageFooter />
      <PlayerContainer>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </PlayerContainer>
    </DashBoardContainer>
  );
};

export default Dashboard;
